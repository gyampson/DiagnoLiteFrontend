import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Upload, RefreshCw, AlertCircle } from 'lucide-react-native';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import DiseaseCard from '@/components/DiseaseCard';
import { diseases } from '@/constants/diseases';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [diagnosisResult, setDiagnosisResult] = useState<any | null>(null);
  const cameraRef = useRef<any>(null);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setCapturedImage(photo.uri);
        simulateImageAnalysis();
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
      simulateImageAnalysis();
    }
  };

  const simulateImageAnalysis = () => {
    setAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      // For demo purposes, randomly select a skin infection
      const skinInfection = diseases.find((d) => d.id === 'skin-infection');
      if (skinInfection) {
        setDiagnosisResult({
          disease: skinInfection,
          confidence: 87,
        });
      }
      setAnalyzing(false);
    }, 2000);
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setDiagnosisResult(null);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <AlertCircle
          size={48}
          color={Colors.primary}
          style={styles.permissionIcon}
        />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>
          DiagnoLite needs camera access to analyze skin conditions and other
          visual symptoms.
        </Text>
        <Button
          title="Grant Camera Permission"
          onPress={requestPermission}
          style={styles.permissionButton}
          testID="grant-permission-button"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <ScrollView contentContainerStyle={styles.imageResultContainer}>
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />

          <View style={styles.actionButtons}>
            <Button
              title="Take New Photo"
              onPress={resetCamera}
              variant="outline"
              style={styles.actionButton}
              testID="new-photo-button"
            />
            <Button
              title="Upload Different Image"
              onPress={pickImage}
              variant="outline"
              style={styles.actionButton}
              testID="upload-different-button"
            />
          </View>

          {analyzing ? (
            <View style={styles.analyzingContainer}>
              <RefreshCw
                size={32}
                color={Colors.primary}
                style={styles.spinningIcon}
              />
              <Text style={styles.analyzingText}>Analyzing image...</Text>
              <Text style={styles.analyzingSubtext}>
                Our AI is examining the visual symptoms
              </Text>
            </View>
          ) : diagnosisResult ? (
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>Diagnosis Results</Text>
              <Text style={styles.resultsSubtitle}>
                Based on the image analysis, we found:
              </Text>

              <DiseaseCard
                disease={diagnosisResult.disease}
                matchPercentage={diagnosisResult.confidence}
                testID="diagnosis-result-card"
              />

              <View style={styles.disclaimer}>
                <AlertCircle size={16} color={Colors.warning} />
                <Text style={styles.disclaimerText}>
                  This is an AI-assisted diagnosis. Always consult with a
                  medical professional for confirmation.
                </Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
      ) : (
        <>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.cameraOverlay}>
              <View style={styles.cameraControls}>
                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={toggleCameraFacing}
                  testID="flip-camera-button"
                >
                  <RefreshCw size={24} color={Colors.white} />
                </TouchableOpacity>
              </View>

              <View style={styles.cameraGuide}>
                <View style={styles.cameraGuideFrame} />
                <Text style={styles.cameraGuideText}>
                  Position the affected area within the frame
                </Text>
              </View>

              <View style={styles.cameraButtons}>
                <TouchableOpacity
                  style={styles.galleryButton}
                  onPress={pickImage}
                  testID="gallery-button"
                >
                  <Upload size={24} color={Colors.white} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={takePicture}
                  testID="capture-button"
                >
                  <View style={styles.captureButtonInner} />
                </TouchableOpacity>

                <View style={styles.placeholderButton} />
              </View>
            </View>
          </CameraView>

          <View style={styles.instructions}>
            <Text style={styles.instructionsTitle}>Image Diagnosis</Text>
            <Text style={styles.instructionsText}>
              Take a clear photo of the affected area or upload an existing
              image for AI analysis.
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionIcon: {
    marginBottom: 16,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    width: '80%',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  flipButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraGuide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraGuideFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 8,
    marginBottom: 16,
  },
  cameraGuideText: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  cameraButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.white,
  },
  placeholderButton: {
    width: 50,
    height: 50,
  },
  instructions: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
  imageResultContainer: {
    padding: 16,
  },
  capturedImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  analyzingContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
  },
  spinningIcon: {
    marginBottom: 16,
  },
  analyzingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  analyzingSubtext: {
    fontSize: 14,
    color: Colors.textLight,
    textAlign: 'center',
  },
  resultsContainer: {
    padding: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 16,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  disclaimerText: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 8,
    flex: 1,
  },
});
