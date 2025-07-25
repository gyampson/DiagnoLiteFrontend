import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, ChevronRight, TriangleAlert as AlertTriangle, Thermometer, Bug, Bandage } from 'lucide-react-native';

interface Guideline {
  id: string;
  title: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  icon: string;
  symptoms: string[];
  diagnosis: string[];
  treatment: string[];
  referral: string[];
}

const guidelines: Guideline[] = [
  {
    id: '1',
    title: 'Malaria Management',
    category: 'Infectious Disease',
    urgency: 'high',
    icon: 'bug',
    symptoms: [
      'Fever (often cyclical)',
      'Chills and sweats',
      'Headache',
      'Muscle aches',
      'Fatigue',
      'Nausea and vomiting'
    ],
    diagnosis: [
      'Use rapid diagnostic test (RDT) if available',
      'Check for fever pattern',
      'Assess travel history to endemic areas',
      'Look for signs of severe malaria'
    ],
    treatment: [
      'Artemether-lumefantrine (if confirmed)',
      'Paracetamol for fever',
      'Oral rehydration therapy',
      'Monitor temperature every 4 hours',
      'Ensure complete treatment course'
    ],
    referral: [
      'Signs of severe malaria (convulsions, unconsciousness)',
      'Unable to keep oral medication down',
      'No improvement after 48 hours',
      'Pregnant women with confirmed malaria'
    ]
  },
  {
    id: '2',
    title: 'Buruli Ulcer Care',
    category: 'Skin Condition',
    urgency: 'medium',
    icon: 'bandage',
    symptoms: [
      'Painless nodule or swelling',
      'Ulcer with undermined edges',
      'White cotton-wool appearance',
      'Usually affects arms and legs',
      'Minimal pain initially'
    ],
    diagnosis: [
      'Document size, location, and appearance',
      'Take clear photos if possible',
      'Check for multiple lesions',
      'Assess duration of symptoms'
    ],
    treatment: [
      'DO NOT incise or drain',
      'Clean with antiseptic solution',
      'Apply sterile dressing',
      'Pain management with paracetamol',
      'Protect from further trauma'
    ],
    referral: [
      'All suspected Buruli ulcer cases',
      'Ulcers larger than 5cm',
      'Multiple lesions',
      'Signs of secondary infection'
    ]
  },
  {
    id: '3',
    title: 'Common Skin Infections',
    category: 'Skin Condition',
    urgency: 'low',
    icon: 'thermometer',
    symptoms: [
      'Red, warm, swollen skin',
      'Pain or tenderness',
      'Pus or discharge',
      'Fever (if systemic)',
      'Red streaking (cellulitis)'
    ],
    diagnosis: [
      'Assess size and extent of infection',
      'Check for systemic symptoms',
      'Look for entry point (cut, scratch)',
      'Evaluate surrounding tissue'
    ],
    treatment: [
      'Clean wound with antiseptic',
      'Apply topical antibiotic',
      'Oral antibiotics if spreading',
      'Elevate affected area',
      'Daily dressing changes'
    ],
    referral: [
      'Red streaking up limb',
      'High fever with skin infection',
      'Rapidly spreading infection',
      'No improvement after 72 hours'
    ]
  }
];

export default function TreatmentGuidelines() {
  const [searchText, setSearchText] = useState('');
  const [selectedGuideline, setSelectedGuideline] = useState<Guideline | null>(null);

  const filteredGuidelines = guidelines.filter(guideline =>
    guideline.title.toLowerCase().includes(searchText.toLowerCase()) ||
    guideline.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return '#DC2626';
      case 'medium': return '#EA580C';
      case 'low': return '#059669';
      default: return '#6B7280';
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'bug': return <Bug size={24} color="#2563EB" />;
      case 'bandage': return <Bandage size={24} color="#2563EB" />;
      case 'thermometer': return <Thermometer size={24} color="#2563EB" />;
      default: return <AlertTriangle size={24} color="#2563EB" />;
    }
  };

  if (selectedGuideline) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.guidelineHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setSelectedGuideline(null)}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.guidelineTitle}>{selectedGuideline.title}</Text>
            <View style={[
              styles.urgencyBadge, 
              { backgroundColor: getUrgencyColor(selectedGuideline.urgency) }
            ]}>
              <Text style={styles.urgencyText}>
                {selectedGuideline.urgency.toUpperCase()} PRIORITY
              </Text>
            </View>
          </View>

          <View style={styles.guidelineSection}>
            <Text style={styles.sectionTitle}>Common Symptoms</Text>
            {selectedGuideline.symptoms.map((symptom, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listBullet}>•</Text>
                <Text style={styles.listText}>{symptom}</Text>
              </View>
            ))}
          </View>

          <View style={styles.guidelineSection}>
            <Text style={styles.sectionTitle}>Diagnostic Steps</Text>
            {selectedGuideline.diagnosis.map((step, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listNumber}>{index + 1}.</Text>
                <Text style={styles.listText}>{step}</Text>
              </View>
            ))}
          </View>

          <View style={styles.guidelineSection}>
            <Text style={styles.sectionTitle}>Treatment Protocol</Text>
            {selectedGuideline.treatment.map((treatment, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listNumber}>{index + 1}.</Text>
                <Text style={styles.listText}>{treatment}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.guidelineSection, styles.referralSection]}>
            <View style={styles.referralHeader}>
              <AlertTriangle size={20} color="#DC2626" />
              <Text style={styles.referralTitle}>When to Refer</Text>
            </View>
            {selectedGuideline.referral.map((reason, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listBullet}>•</Text>
                <Text style={styles.referralText}>{reason}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Treatment Guidelines</Text>
          <Text style={styles.subtitle}>WHO-approved protocols for common conditions</Text>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search guidelines..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        <View style={styles.guidelinesList}>
          {filteredGuidelines.map((guideline) => (
            <TouchableOpacity
              key={guideline.id}
              style={styles.guidelineCard}
              onPress={() => setSelectedGuideline(guideline)}
            >
              <View style={styles.guidelineCardHeader}>
                {getIcon(guideline.icon)}
                <View style={styles.guidelineCardContent}>
                  <Text style={styles.guidelineCardTitle}>{guideline.title}</Text>
                  <Text style={styles.guidelineCardCategory}>{guideline.category}</Text>
                </View>
                <View style={styles.guidelineCardRight}>
                  <View style={[
                    styles.urgencyIndicator,
                    { backgroundColor: getUrgencyColor(guideline.urgency) }
                  ]} />
                  <ChevronRight size={20} color="#64748B" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  searchSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  guidelinesList: {
    padding: 20,
    gap: 12,
  },
  guidelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  guidelineCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  guidelineCardContent: {
    flex: 1,
  },
  guidelineCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  guidelineCardCategory: {
    fontSize: 14,
    color: '#64748B',
  },
  guidelineCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  urgencyIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  guidelineHeader: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    marginBottom: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '500',
  },
  guidelineTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
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
  guidelineSection: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 8,
  },
  listBullet: {
    fontSize: 16,
    color: '#2563EB',
    marginRight: 8,
    width: 12,
  },
  listNumber: {
    fontSize: 16,
    color: '#2563EB',
    marginRight: 8,
    width: 20,
    fontWeight: '600',
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  referralSection: {
    backgroundColor: '#FEF2F2',
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  referralHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  referralTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DC2626',
  },
  referralText: {
    flex: 1,
    fontSize: 15,
    color: '#991B1B',
    lineHeight: 22,
    fontWeight: '500',
  },
});