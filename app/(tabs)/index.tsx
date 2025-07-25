import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ChevronRight, Thermometer, Heart, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from 'lucide-react-native';

interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
}

interface DiagnosisResult {
  condition: string;
  confidence: number;
  symptoms: string[];
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high';
}

const commonSymptoms: Symptom[] = [
  { id: '1', name: 'Fever', category: 'General', severity: 'medium' },
  { id: '2', name: 'Headache', category: 'General', severity: 'low' },
  { id: '3', name: 'Chills', category: 'General', severity: 'medium' },
  { id: '4', name: 'Muscle aches', category: 'General', severity: 'low' },
  { id: '5', name: 'Skin ulcer', category: 'Skin', severity: 'high' },
  { id: '6', name: 'Joint pain', category: 'Musculoskeletal', severity: 'medium' },
  { id: '7', name: 'Fatigue', category: 'General', severity: 'low' },
  { id: '8', name: 'Skin lesion', category: 'Skin', severity: 'medium' },
];

export default function SymptomChecker() {
  const [searchText, setSearchText] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [vitalSigns, setVitalSigns] = useState({
    temperature: '',
    pulse: '',
  });
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const runDiagnosis = () => {
    if (selectedSymptoms.length === 0) {
      Alert.alert('No Symptoms', 'Please select at least one symptom to continue.');
      return;
    }

    // Simple AI simulation based on selected symptoms
    const selectedSymptomNames = selectedSymptoms.map(id =>
      commonSymptoms.find(s => s.id === id)?.name || ''
    );

    let result: DiagnosisResult;

    if (selectedSymptomNames.includes('Fever') && selectedSymptomNames.includes('Chills')) {
      result = {
        condition: 'Malaria (Suspected)',
        confidence: 78,
        symptoms: selectedSymptomNames,
        recommendations: [
          'Rapid diagnostic test (RDT) recommended',
          'Monitor temperature every 4 hours',
          'Ensure adequate fluid intake',
          'Refer to health facility if condition worsens'
        ],
        urgency: 'high'
      };
    } else if (selectedSymptomNames.includes('Skin ulcer') || selectedSymptomNames.includes('Skin lesion')) {
      result = {
        condition: 'Buruli Ulcer (Possible)',
        confidence: 65,
        symptoms: selectedSymptomNames,
        recommendations: [
          'Clean wound with antiseptic solution',
          'Apply sterile dressing',
          'Document wound size and appearance',
          'Refer to specialized care facility'
        ],
        urgency: 'medium'
      };
    } else {
      result = {
        condition: 'Common Viral Infection',
        confidence: 55,
        symptoms: selectedSymptomNames,
        recommendations: [
          'Rest and adequate hydration',
          'Monitor symptoms for 24-48 hours',
          'Return if symptoms worsen',
          'Paracetamol for fever if available'
        ],
        urgency: 'low'
      };
    }

    setDiagnosis(result);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return '#DC2626';
      case 'medium': return '#EA580C';
      case 'low': return '#059669';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Symptom Checker</Text>
          <Text style={styles.subtitle}>Select symptoms to get diagnostic suggestions</Text>
        </View>

        {/* Vital Signs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vital Signs</Text>
          <View style={styles.vitalSignsContainer}>
            <View style={styles.vitalInput}>
              <Thermometer size={20} color="#2563EB" />
              <TextInput
                style={styles.vitalTextInput}
                placeholder="Temperature (°C)"
                value={vitalSigns.temperature}
                onChangeText={(text) => setVitalSigns(prev => ({ ...prev, temperature: text }))}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.vitalInput}>
              <Heart size={20} color="#DC2626" />
              <TextInput
                style={styles.vitalTextInput}
                placeholder="Pulse (bpm)"
                value={vitalSigns.pulse}
                onChangeText={(text) => setVitalSigns(prev => ({ ...prev, pulse: text }))}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Symptom Search */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Symptoms</Text>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search symptoms..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Symptom List */}
          <View style={styles.symptomList}>
            {filteredSymptoms.map((symptom) => (
              <TouchableOpacity
                key={symptom.id}
                style={[
                  styles.symptomItem,
                  selectedSymptoms.includes(symptom.id) && styles.symptomItemSelected
                ]}
                onPress={() => toggleSymptom(symptom.id)}
              >
                <View style={styles.symptomContent}>
                  <Text style={[
                    styles.symptomName,
                    selectedSymptoms.includes(symptom.id) && styles.symptomNameSelected
                  ]}>
                    {symptom.name}
                  </Text>
                  <Text style={styles.symptomCategory}>{symptom.category}</Text>
                </View>
                {selectedSymptoms.includes(symptom.id) && (
                  <CheckCircle2 size={20} color="#2563EB" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Analyze Button */}
        {selectedSymptoms.length > 0 && (
          <TouchableOpacity style={styles.analyzeButton} onPress={runDiagnosis}>
            <Text style={styles.analyzeButtonText}>Analyze Symptoms</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        {/* Diagnosis Results */}
        {diagnosis && (
          <View style={styles.diagnosisContainer}>
            <View style={styles.diagnosisHeader}>
              <AlertCircle size={24} color={getUrgencyColor(diagnosis.urgency)} />
              <Text style={styles.diagnosisTitle}>Diagnostic Analysis</Text>
            </View>
            
            <View style={styles.diagnosisResult}>
              <Text style={styles.conditionName}>{diagnosis.condition}</Text>
              <Text style={styles.confidence}>Confidence: {diagnosis.confidence}%</Text>
              
              <View style={[styles.urgencyBadge, { backgroundColor: getUrgencyColor(diagnosis.urgency) }]}>
                <Text style={styles.urgencyText}>
                  {diagnosis.urgency.toUpperCase()} PRIORITY
                </Text>
              </View>
            </View>

            <View style={styles.recommendationsSection}>
              <Text style={styles.recommendationsTitle}>Recommended Actions:</Text>
              {diagnosis.recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <Text style={styles.recommendationBullet}>•</Text>
                  <Text style={styles.recommendationText}>{rec}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  vitalSignsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  vitalInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  vitalTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  symptomList: {
    gap: 8,
  },
  symptomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  symptomItemSelected: {
    backgroundColor: '#EBF4FF',
    borderColor: '#2563EB',
  },
  symptomContent: {
    flex: 1,
  },
  symptomName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },
  symptomNameSelected: {
    color: '#2563EB',
  },
  symptomCategory: {
    fontSize: 14,
    color: '#64748B',
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  analyzeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  diagnosisContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  diagnosisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  diagnosisTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  diagnosisResult: {
    marginBottom: 20,
  },
  conditionName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  confidence: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  urgencyBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recommendationsSection: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 16,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 8,
  },
  recommendationBullet: {
    fontSize: 16,
    color: '#2563EB',
    marginRight: 8,
    width: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
});