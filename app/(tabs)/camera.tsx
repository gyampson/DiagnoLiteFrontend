import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera as CameraIcon, RotateCcw, Image as ImageIcon, Zap, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2 } from 'lucide-react-native';

interface ImageAnalysis {
  condition: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  referralNeeded: boolean;
}

export default function CameraDiagnosis() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading camera permissions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <CameraIcon size={48} color="#64748B" />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            DiagnoLite needs camera access to analyze medical images and assist with diagnosis.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Camera Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });
        if (photo?.uri) {
          setCapturedImage(photo.uri);
          setShowCamera(false);
          analyzeImage(photo.uri);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to capture image. Please try again.');
      }
    }
  };

  const analyzeImage = async (imageUri: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis with delay
    setTimeout(() => {
      const mockAnalysis: ImageAnalysis = {
        condition: 'Possible Skin Infection',
        confidence: 72,
        severity: 'moderate',
        recommendations: [
          'Clean the affected area with antiseptic',
          'Apply topical antibiotic if available',
          'Monitor for signs of spreading infection',
          'Keep the area dry and covered',
          'Document size and appearance daily'
        ],
        referralNeeded: true
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe': return '#DC2626';
      case 'moderate': return '#EA580C';
      case 'mild': return '#059669';
      default: return '#6B7280';
    }
  };

  if (showCamera) {
    return (
      <SafeAreaView style={styles.container}>
        <CameraView 
          ref={cameraRef}
          style={styles.camera} 
          facing={facing}
        >
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <TouchableOpacity 
                style={styles.cameraHeaderButton}
                onPress={() => setShowCamera(false)}
              >
                <Text style={styles.cameraHeaderText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.cameraHeaderButton}
                onPress={toggleCameraFacing}
              >
                <RotateCcw size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.cameraControls}>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Image Diagnosis</Text>
          <Text style={styles.subtitle}>Capture images for AI-assisted analysis</Text>
        </View>

        {!capturedImage ? (
          <View style={styles.cameraPrompt}>
            <ImageIcon size={64} color="#64748B" />
            <Text style={styles.promptTitle}>Take a Photo</Text>
            <Text style={styles.promptText}>
              Capture clear images of skin conditions, wounds, or other visible symptoms
            </Text>
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={() => setShowCamera(true)}
            >
              <CameraIcon size={24} color="#FFFFFF" />
              <Text style={styles.cameraButtonText}>Open Camera</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.imageContainer}>
            <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
            
            {isAnalyzing ? (
              <View style={styles.analyzingContainer}>
                <Zap size={24} color="#2563EB" />
                <Text style={styles.analyzingText}>Analyzing image...</Text>
              </View>
            ) : analysis ? (
              <View style={styles.analysisContainer}>
                <View style={styles.analysisHeader}>
                  <AlertTriangle size={24} color={getSeverityColor(analysis.severity)} />
                  <Text style={styles.analysisTitle}>Analysis Results</Text>
                </View>
                
                <View style={styles.analysisResult}>
                  <Text style={styles.analysisCondition}>{analysis.condition}</Text>
                  <Text style={styles.analysisConfidence}>Confidence: {analysis.confidence}%</Text>
                  
                  <View style={[
                    styles.severityBadge, 
                    { backgroundColor: getSeverityColor(analysis.severity) }
                  ]}>
                    <Text style={styles.severityText}>
                      {analysis.severity.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.recommendationsSection}>
                  <Text style={styles.recommendationsTitle}>Treatment Recommendations:</Text>
                  {analysis.recommendations.map((rec, index) => (
                    <View key={index} style={styles.recommendationItem}>
                      <Text style={styles.recommendationBullet}>•</Text>
                      <Text style={styles.recommendationText}>{rec}</Text>
                    </View>
                  ))}
                </View>

                {analysis.referralNeeded && (
                  <View style={styles.referralNotice}>
                    <AlertTriangle size={20} color="#EA580C" />
                    <Text style={styles.referralText}>
                      Referral to healthcare facility recommended
                    </Text>
                  </View>
                )}
              </View>
            ) : null}

            <TouchableOpacity 
              style={styles.retakeButton}
              onPress={() => {
                setCapturedImage(null);
                setAnalysis(null);
                setShowCamera(true);
              }}
            >
              <Text style={styles.retakeButtonText}>Take Another Photo</Text>
            </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
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
  cameraPrompt: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
  },
  promptTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  promptText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  cameraButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  cameraHeaderButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cameraHeaderText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  cameraControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#2563EB',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563EB',
  },
  imageContainer: {
    padding: 20,
  },
  capturedImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  analyzingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    marginTop: 16,
    borderRadius: 8,
    gap: 8,
  },
  analyzingText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '500',
  },
  analysisContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  analysisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  analysisResult: {
    marginBottom: 20,
  },
  analysisCondition: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  analysisConfidence: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  severityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recommendationsSection: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 16,
    marginBottom: 16,
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
  referralNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  referralText: {
    fontSize: 14,
    color: '#D97706',
    fontWeight: '500',
    flex: 1,
  },
  retakeButton: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  retakeButtonText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '500',
  },
});