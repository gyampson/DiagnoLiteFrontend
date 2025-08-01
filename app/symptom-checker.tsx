import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
// import { useRouter } from "expo-router";
import { AlertTriangle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import SymptomCheckbox from '@/components/SymptomCheckbox';
import Button from '@/components/Button';
import DiseaseCard from '@/components/DiseaseCard';
import { symptoms } from '@/constants/symptoms';
import { useDiagnosis } from '@/hooks/use-diagnosis-store';

export default function SymptomCheckerScreen() {
  // const router = useRouter(); // Unused variable
  const {
    selectedSymptoms,
    toggleSymptom,
    clearSelectedSymptoms,
    performDiagnosis,
    diagnosisResults,
  } = useDiagnosis();
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Reset results view when navigating to this screen
  useEffect(() => {
    setShowResults(false);
  }, []);

  const handleCheckSymptoms = () => {
    if (selectedSymptoms.length === 0) {
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI processing delay
    setTimeout(() => {
      performDiagnosis();
      setShowResults(true);
      setIsAnalyzing(false);
    }, 1500);
  };

  const handleReset = () => {
    clearSelectedSymptoms();
    setShowResults(false);
  };

  return (
    <View style={styles.container}>
      {!showResults ? (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>Select Your Symptoms</Text>
            <Text style={styles.subtitle}>
              Check all symptoms that apply to help us provide an accurate
              diagnosis
            </Text>
          </View>

          <ScrollView style={styles.symptomsContainer}>
            {symptoms.map((symptom) => (
              <SymptomCheckbox
                key={symptom.id}
                label={symptom.name}
                isSelected={selectedSymptoms.includes(symptom.id)}
                onToggle={() => toggleSymptom(symptom.id)}
                testID={`symptom-${symptom.id}`}
              />
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.selectionCount}>
              {selectedSymptoms.length} symptoms selected
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Reset"
                variant="outline"
                onPress={handleReset}
                style={styles.resetButton}
                disabled={selectedSymptoms.length === 0}
                testID="reset-button"
              />
              <Button
                title="Check Symptoms"
                onPress={handleCheckSymptoms}
                style={styles.checkButton}
                disabled={selectedSymptoms.length === 0}
                loading={isAnalyzing}
                testID="check-symptoms-button"
              />
            </View>
          </View>
        </>
      ) : (
        <ScrollView
          style={styles.resultsContainer}
          contentContainerStyle={styles.resultsContent}
        >
          <Text style={styles.resultsTitle}>Diagnosis Results</Text>

          {diagnosisResults.length > 0 ? (
            <>
              <Text style={styles.resultsSubtitle}>
                Based on your symptoms, here are the possible conditions:
              </Text>

              {diagnosisResults.map((result, index) => (
                <DiseaseCard
                  key={index}
                  disease={result.disease}
                  matchPercentage={result.matchPercentage}
                  testID={`result-${index}`}
                />
              ))}

              <View style={styles.disclaimer}>
                <AlertTriangle
                  size={20}
                  color={Colors.warning}
                  style={styles.disclaimerIcon}
                />
                <Text style={styles.disclaimerText}>
                  This is an AI-assisted diagnosis. Always consult with a
                  medical professional for confirmation.
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.noResults}>
              <AlertTriangle
                size={48}
                color={Colors.warning}
                style={styles.noResultsIcon}
              />
              <Text style={styles.noResultsTitle}>No Matches Found</Text>
              <Text style={styles.noResultsText}>
                We couldn&apos;t find any conditions matching your symptoms.
                Please try selecting different symptoms or consult a healthcare
                professional.
              </Text>
            </View>
          )}

          <View style={styles.resultsFooter}>
            <Button
              title="Check Different Symptoms"
              variant="outline"
              onPress={handleReset}
              style={styles.newCheckButton}
              testID="new-check-button"
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  symptomsContainer: {
    flex: 1,
    padding: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  selectionCount: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetButton: {
    flex: 1,
    marginRight: 8,
  },
  checkButton: {
    flex: 2,
    marginLeft: 8,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  resultsSubtitle: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 24,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.highlight,
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  disclaimerIcon: {
    marginRight: 12,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  noResults: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginVertical: 16,
  },
  noResultsIcon: {
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  resultsFooter: {
    marginTop: 16,
    marginBottom: 32,
  },
  newCheckButton: {
    width: '100%',
  },
});
