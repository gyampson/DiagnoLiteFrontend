export interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  commonIn: string[];
}

export interface DiagnosisResult {
  condition: string;
  confidence: number;
  symptoms: string[];
  recommendations: string[];
  urgency: 'low' | 'medium' | 'high';
  treatmentProtocol?: string;
  referralRequired: boolean;
}

export interface ImageAnalysis {
  condition: string;
  confidence: number;
  severity: 'mild' | 'moderate' | 'severe';
  recommendations: string[];
  referralNeeded: boolean;
  imageMetadata?: {
    size: { width: number; height: number };
    quality: number;
    timestamp: string;
  };
}

export interface PatientRecord {
  id: string;
  patientId: string;
  healthWorkerId: string;
  timestamp: string;
  type: 'symptom' | 'image';
  diagnosis: DiagnosisResult | ImageAnalysis;
  status: 'pending' | 'treated' | 'referred';
  notes?: string;
  followUp?: {
    required: boolean;
    date?: string;
    instructions?: string;
  };
}

export interface TreatmentGuideline {
  id: string;
  title: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  symptoms: string[];
  diagnosis: string[];
  treatment: string[];
  referral: string[];
  version: string;
  lastUpdated: string;
}