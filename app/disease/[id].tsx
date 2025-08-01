import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AlertCircle, Check, X, Shield } from "lucide-react-native";
import Colors from "@/constants/colors";
import Button from "@/components/Button";
import { diseases } from "@/constants/diseases";

export default function DiseaseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const disease = diseases.find(d => d.id === id);
  
  if (!disease) {
    return (
      <View style={styles.notFound}>
        <AlertCircle size={48} color={Colors.error} style={styles.notFoundIcon} />
        <Text style={styles.notFoundTitle}>Disease Not Found</Text>
        <Text style={styles.notFoundText}>
          The disease information you&apos;re looking for is not available.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{disease.name}</Text>
        <Text style={styles.description}>{disease.description}</Text>
      </View>
      
      {disease.imageUrl && (
        <Image source={{ uri: disease.imageUrl }} style={styles.image} />
      )}
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <AlertCircle size={20} color={Colors.primary} />
          <Text style={styles.sectionTitle}>Symptoms</Text>
        </View>
        <View style={styles.listContainer}>
          {disease.symptoms.map((symptom, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.listText}>{symptom}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <X size={20} color={Colors.error} />
          <Text style={styles.sectionTitle}>Causes</Text>
        </View>
        <View style={styles.listContainer}>
          {disease.causes.map((cause, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.listText}>{cause}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Check size={20} color={Colors.success} />
          <Text style={styles.sectionTitle}>Treatment</Text>
        </View>
        <View style={styles.listContainer}>
          {disease.treatments.map((treatment, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.listText}>{treatment}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Shield size={20} color={Colors.secondary} />
          <Text style={styles.sectionTitle}>Prevention</Text>
        </View>
        <View style={styles.listContainer}>
          {disease.preventions.map((prevention, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bulletPoint} />
              <Text style={styles.listText}>{prevention}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerTitle}>Medical Disclaimer</Text>
        <Text style={styles.disclaimerText}>
          This information is for educational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical condition.
        </Text>
      </View>
      
      <View style={styles.actionButtons}>
        <Button
          title="Check Symptoms"
          onPress={() => {}}
          style={styles.actionButton}
          testID="check-symptoms-button"
        />
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
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    lineHeight: 24,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginLeft: 8,
  },
  listContainer: {
    marginLeft: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 8,
    marginRight: 8,
  },
  listText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  disclaimer: {
    backgroundColor: Colors.highlight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  actionButtons: {
    marginBottom: 32,
  },
  actionButton: {
    marginBottom: 12,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundIcon: {
    marginBottom: 16,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: "center",
  },
});