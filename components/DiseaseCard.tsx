import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Disease } from '@/constants/diseases';

interface DiseaseCardProps {
  disease: Disease;
  matchPercentage?: number;
  testID?: string;
}

const DiseaseCard: React.FC<DiseaseCardProps> = ({
  disease,
  matchPercentage,
  testID,
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
     onPress={() =>
  router.push({
    pathname: "/disease/[id]",
    params: { id: disease.id },
  })
}

      testID={testID}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{disease.name}</Text>
          {matchPercentage && (
            <View style={styles.matchContainer}>
              <Text style={styles.matchText}>{matchPercentage}% match</Text>
            </View>
          )}
        </View>
        <AlertCircle size={24} color={Colors.primary} />
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {disease.description}
      </Text>

      <View style={styles.symptomsContainer}>
        <Text style={styles.symptomsTitle}>Common symptoms:</Text>
        <View style={styles.symptoms}>
          {disease.symptoms.slice(0, 3).map((symptom, index) => (
            <View key={index} style={styles.symptomTag}>
              <Text style={styles.symptomText}>{symptom}</Text>
            </View>
          ))}
          {disease.symptoms.length > 3 && (
            <View style={styles.symptomTag}>
              <Text style={styles.symptomText}>
                +{disease.symptoms.length - 3} more
              </Text>
            </View>
          )}
        </View>
      </View>

      {disease.imageUrl && (
        <Image source={{ uri: disease.imageUrl }} style={styles.image} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  matchContainer: {
    backgroundColor: Colors.highlight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  matchText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 12,
  },
  symptomsContainer: {
    marginBottom: 12,
  },
  symptomsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 6,
  },
  symptoms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
});

export default DiseaseCard;
