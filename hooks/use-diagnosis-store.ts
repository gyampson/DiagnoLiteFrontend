import { useState, useEffect } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { diseases, Disease } from '@/constants/diseases';
import { symptoms, Symptom } from '@/constants/symptoms';

interface DiagnosisResult {
  disease: Disease;
  matchPercentage: number;
}

interface DiagnosisState {
  selectedSymptoms: string[];
  diagnosisResults: DiagnosisResult[];
  recentDiagnoses: {
    date: string;
    symptoms: string[];
    results: DiagnosisResult[];
  }[];
  isLoading: boolean;
}

export const [DiagnosisProvider, useDiagnosis] = createContextHook(() => {
  const [state, setState] = useState<DiagnosisState>({
    selectedSymptoms: [],
    diagnosisResults: [],
    recentDiagnoses: [],
    isLoading: true,
  });

  // Load saved diagnoses on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await AsyncStorage.getItem('diagnosisData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setState((prevState) => ({
            ...prevState,
            recentDiagnoses: parsedData.recentDiagnoses || [],
            isLoading: false,
          }));
        } else {
          setState((prevState) => ({ ...prevState, isLoading: false }));
        }
      } catch (error) {
        console.error('Error loading diagnosis data:', error);
        setState((prevState) => ({ ...prevState, isLoading: false }));
      }
    };

    loadSavedData();
  }, []);

  // Save data when recentDiagnoses changes
  useEffect(() => {
    const saveData = async () => {
      if (!state.isLoading) {
        try {
          await AsyncStorage.setItem(
            'diagnosisData',
            JSON.stringify({
              recentDiagnoses: state.recentDiagnoses,
            })
          );
        } catch (error) {
          console.error('Error saving diagnosis data:', error);
        }
      }
    };

    saveData();
  }, [state.recentDiagnoses, state.isLoading]);

  const toggleSymptom = (symptomId: string) => {
    setState((prevState) => {
      const isSelected = prevState.selectedSymptoms.includes(symptomId);
      const updatedSymptoms = isSelected
        ? prevState.selectedSymptoms.filter((id) => id !== symptomId)
        : [...prevState.selectedSymptoms, symptomId];

      return {
        ...prevState,
        selectedSymptoms: updatedSymptoms,
      };
    });
  };

  const clearSelectedSymptoms = () => {
    setState((prevState) => ({
      ...prevState,
      selectedSymptoms: [],
      diagnosisResults: [],
    }));
  };

  const performDiagnosis = () => {
    if (state.selectedSymptoms.length === 0) return;

    // Get the selected symptom objects
    const selectedSymptomObjects = symptoms.filter((symptom) =>
      state.selectedSymptoms.includes(symptom.id)
    );

    // Calculate match percentages for each disease
    const results: DiagnosisResult[] = diseases.map((disease) => {
      // Count how many of the selected symptoms match this disease
      const matchingSymptoms = selectedSymptomObjects.filter((symptom) =>
        symptom.relatedDiseases.includes(disease.id)
      );

      // Calculate match percentage
      const matchPercentage = Math.round(
        (matchingSymptoms.length / selectedSymptomObjects.length) * 100
      );

      return {
        disease,
        matchPercentage,
      };
    });

    // Sort by match percentage (highest first)
    const sortedResults = results
      .filter((result) => result.matchPercentage > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Save this diagnosis to recent diagnoses
    const newDiagnosis = {
      date: new Date().toISOString(),
      symptoms: [...state.selectedSymptoms],
      results: sortedResults,
    };

    setState((prevState) => ({
      ...prevState,
      diagnosisResults: sortedResults,
      recentDiagnoses: [newDiagnosis, ...prevState.recentDiagnoses].slice(
        0,
        10
      ), // Keep only the 10 most recent
    }));
  };

  const getSymptomById = (id: string): Symptom | undefined => {
    return symptoms.find((symptom) => symptom.id === id);
  };

  return {
    selectedSymptoms: state.selectedSymptoms,
    diagnosisResults: state.diagnosisResults,
    recentDiagnoses: state.recentDiagnoses,
    isLoading: state.isLoading,
    toggleSymptom,
    clearSelectedSymptoms,
    performDiagnosis,
    getSymptomById,
  };
});
