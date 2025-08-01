import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Stethoscope, Camera, FileText } from 'lucide-react-native';
import Colors from '@/constants/colors';
import DiagnosisCard from '@/components/DiagnosisCard';
import Button from '@/components/Button';
import { useDiagnosis } from '@/hooks/use-diagnosis-store';
import { symptoms } from '@/constants/symptoms';
import AnimatedWrapper from "@/components/AnimatedWrapper";


export default function HomeScreen() {
  const router = useRouter();
  const { recentDiagnoses } = useDiagnosis();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AnimatedWrapper animationType="slideUp" style={styles.header}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
          }}
          style={styles.headerImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>DiagnoLite</Text>
          <Text style={styles.subtitle}>
            AI-powered diagnostics for rural healthcare
          </Text>
        </View>
      </AnimatedWrapper>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diagnostic Tools</Text>
        <DiagnosisCard
          title="Symptom Checker"
          description="Check symptoms to get possible diagnoses"
          icon={<Stethoscope size={24} color={Colors.primary} />}
          route="/symptom-checker"
          testID="symptom-checker-card"
        />
        <DiagnosisCard
          title="Image Diagnosis"
          description="Upload or take photos for visual diagnosis"
          icon={<Camera size={24} color={Colors.primary} />}
          route="/(tabs)/camera"
          testID="image-diagnosis-card"
        />
        <DiagnosisCard
          title="Treatment Guidelines"
          description="Access treatment protocols and guidelines"
          icon={<FileText size={24} color={Colors.primary} />}
          route="/(tabs)/guidelines"
          testID="guidelines-card"
        />
      </View>

      {recentDiagnoses.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Diagnoses</Text>
            <Button
              title="View All"
              variant="outline"
              size="small"
              onPress={() => router.push('/(tabs)/settings')}
              testID="view-all-button"
            />
          </View>

          <View style={styles.recentCard}>
            <Text style={styles.recentTitle}>
              {new Date(recentDiagnoses[0].date).toLocaleDateString()}
            </Text>
            <View style={styles.symptoms}>
              {recentDiagnoses[0].symptoms
                .slice(0, 3)
                .map((symptomId, index) => {
                  // Get symptoms outside of the callback to avoid hooks rule violation
                  const symptom = symptoms.find((s) => s.id === symptomId);
                  return (
                    <View key={index} style={styles.symptomTag}>
                      <Text style={styles.symptomText}>
                        {symptom?.name || symptomId}
                      </Text>
                    </View>
                  );
                })}
              {recentDiagnoses[0].symptoms.length > 3 && (
                <View style={styles.symptomTag}>
                  <Text style={styles.symptomText}>
                    +{recentDiagnoses[0].symptoms.length - 3} more
                  </Text>
                </View>
              )}
            </View>
            <Button
              title="View Results"
              onPress={() => router.push('/symptom-checker')}
              style={styles.viewButton}
              testID="view-results-button"
            />
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About DiagnoLite</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            DiagnoLite is an offline AI-based diagnostic tool designed for rural
            healthcare workers. It helps perform basic diagnostic assessments
            without internet connectivity.
          </Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  header: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  recentCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  symptoms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  symptomTag: {
    backgroundColor: Colors.highlight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  symptomText: {
    fontSize: 12,
    color: Colors.primary,
  },
  viewButton: {
    alignSelf: 'flex-end',
  },
  aboutCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: 'right',
  },
});
