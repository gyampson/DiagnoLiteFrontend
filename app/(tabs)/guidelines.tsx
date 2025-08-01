import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Search, ChevronRight } from "lucide-react-native";
import Colors from "@/constants/colors";
import { diseases } from "@/constants/diseases";
import { useRouter } from "expo-router";

export default function GuidelinesScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter()
  
  const filteredDiseases = diseases.filter(disease => 
    disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    disease.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search diseases or treatments..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.textLight}
          testID="search-input"
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Treatment Guidelines</Text>
        <Text style={styles.sectionDescription}>
          Access evidence-based treatment protocols for common diseases in rural areas.
          These guidelines are based on WHO recommendations.
        </Text>
        
        <View style={styles.diseaseList}>
  {filteredDiseases.map((disease, index) => (
    <TouchableOpacity
      key={disease.id}
      style={styles.diseaseItem}
      onPress={() =>
        router.push({
          pathname: "/disease/[id]",
          params: { id: disease.id },
        })
      }
      testID={`disease-item-${index}`}
    >
      <View style={styles.diseaseContent}>
        <Text style={styles.diseaseName}>{disease.name}</Text>
        <Text style={styles.diseaseDescription} numberOfLines={2}>
          {disease.description}
        </Text>
      </View>
      <ChevronRight size={20} color={Colors.primary} />
    </TouchableOpacity>
  ))}
</View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General Guidelines</Text>
          
          <View style={styles.guidelineCard}>
            <Text style={styles.guidelineTitle}>Patient Assessment</Text>
            <Text style={styles.guidelineText}>
              1. Take a complete medical history{"\n"}
              2. Perform a thorough physical examination{"\n"}
              3. Document vital signs (temperature, pulse, respiration, blood pressure){"\n"}
              4. Assess for danger signs requiring immediate referral{"\n"}
              5. Consider local disease patterns and seasonality
            </Text>
          </View>
          
          <View style={styles.guidelineCard}>
            <Text style={styles.guidelineTitle}>When to Refer</Text>
            <Text style={styles.guidelineText}>
              • Severe symptoms not improving with treatment{"\n"}
              • Signs of severe dehydration{"\n"}
              • Altered consciousness{"\n"}
              • Severe respiratory distress{"\n"}
              • Persistent high fever{"\n"}
              • Severe pain{"\n"}
              • Pregnancy with complications
            </Text>
          </View>
          
          <View style={styles.guidelineCard}>
            <Text style={styles.guidelineTitle}>Medication Administration</Text>
            <Text style={styles.guidelineText}>
              • Verify the right patient, medication, dose, route, and time{"\n"}
              • Check for allergies before administering any medication{"\n"}
              • Explain the purpose and potential side effects to the patient{"\n"}
              • Document all medications given{"\n"}
              • Follow up to assess effectiveness and side effects
            </Text>
          </View>
        </View>
        
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>Important Notice</Text>
          <Text style={styles.disclaimerText}>
            These guidelines are for informational purposes only and are not a substitute for professional medical advice. 
            Always consult with qualified healthcare providers for diagnosis and treatment decisions.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: Colors.text,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 16,
    lineHeight: 20,
  },
  diseaseList: {
    marginBottom: 24,
  },
  diseaseItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  diseaseContent: {
    flex: 1,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  diseaseDescription: {
    fontSize: 14,
    color: Colors.textLight,
  },
  section: {
    marginBottom: 24,
  },
  guidelineCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  guidelineTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },
  disclaimer: {
    backgroundColor: Colors.highlight,
    borderRadius: 8,
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
});