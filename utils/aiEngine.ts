import {
  DiagnosisResult,
  ImageAnalysis,
  Symptom,
} from '@/components/diagnosis';

// Simulated AI diagnostic engine for demonstration
// In production, this would integrate with TensorFlow Lite or ONNX models

export class DiagnosticAI {
  private static diseasePatterns = {
    malaria: {
      keywords: ['fever', 'chills', 'headache', 'muscle aches'],
      confidence: 0.75,
      urgency: 'high' as const,
    },
    buruliUlcer: {
      keywords: ['skin ulcer', 'skin lesion', 'painless'],
      confidence: 0.68,
      urgency: 'medium' as const,
    },
    skinInfection: {
      keywords: ['skin', 'redness', 'swelling', 'pain'],
      confidence: 0.65,
      urgency: 'medium' as const,
    },
    viral: {
      keywords: ['fatigue', 'headache', 'joint pain'],
      confidence: 0.55,
      urgency: 'low' as const,
    },
  };

  private static treatmentProtocols = {
    malaria: [
      'Rapid diagnostic test (RDT) recommended',
      'Artemether-lumefantrine if confirmed positive',
      'Monitor temperature every 4 hours',
      'Ensure adequate fluid intake',
      'Complete full treatment course',
      'Refer if severe symptoms develop',
    ],
    buruliUlcer: [
      'DO NOT incise or drain lesion',
      'Clean with antiseptic solution',
      'Apply sterile dressing',
      'Document size and progression',
      'Immediate referral to specialized care',
      'Pain management with available analgesics',
    ],
    skinInfection: [
      'Clean affected area with antiseptic',
      'Apply topical antibiotic if available',
      'Monitor for signs of spreading',
      'Keep area dry and covered',
      'Return if symptoms worsen',
      'Consider oral antibiotics if systemic signs',
    ],
    viral: [
      'Rest and adequate hydration',
      'Symptomatic treatment for fever/pain',
      'Monitor for 24-48 hours',
      'Return if symptoms persist or worsen',
      'Isolate if contagious symptoms present',
    ],
  };

  static analyzeSymptoms(
    symptoms: string[],
    vitalSigns?: { temperature?: string; pulse?: string }
  ): DiagnosisResult {
    const symptomText = symptoms.join(' ').toLowerCase();

    // Enhanced logic with vital signs
    let bestMatch = 'viral';
    let confidence = 0.4;

    // Check for fever enhancement
    const hasFever =
      vitalSigns?.temperature && parseFloat(vitalSigns.temperature) > 37.5;

    for (const [disease, pattern] of Object.entries(this.diseasePatterns)) {
      const matches = pattern.keywords.filter((keyword) =>
        symptomText.includes(keyword.toLowerCase())
      ).length;

      const matchScore = matches / pattern.keywords.length;
      let adjustedConfidence = pattern.confidence * matchScore;

      // Boost malaria confidence if fever is present
      if (disease === 'malaria' && hasFever) {
        adjustedConfidence += 0.15;
      }

      if (adjustedConfidence > confidence) {
        confidence = adjustedConfidence;
        bestMatch = disease;
      }
    }

    // Ensure confidence doesn't exceed realistic bounds
    confidence = Math.min(confidence, 0.85);

    const result: DiagnosisResult = {
      condition: this.getConditionName(bestMatch),
      confidence: Math.round(confidence * 100),
      symptoms: symptoms,
      recommendations:
        this.treatmentProtocols[
          bestMatch as keyof typeof this.treatmentProtocols
        ] || this.treatmentProtocols.viral,
      urgency:
        this.diseasePatterns[bestMatch as keyof typeof this.diseasePatterns]
          ?.urgency || 'low',
      treatmentProtocol: bestMatch,
      referralRequired: bestMatch === 'malaria' && confidence > 0.7,
    };

    return result;
  }

  static analyzeImage(imageUri: string): Promise<ImageAnalysis> {
    return new Promise((resolve) => {
      // Simulate AI processing time
      setTimeout(() => {
        // Simulated image analysis results
        const mockResults = [
          {
            condition: 'Possible Buruli Ulcer',
            confidence: 72,
            severity: 'moderate' as const,
            recommendations: [
              'DO NOT attempt to drain or incise',
              'Clean gently with antiseptic solution',
              'Apply sterile, non-adherent dressing',
              'Document size: measure length and width',
              'Immediate referral to specialized facility',
              'Patient education about wound care',
            ],
            referralNeeded: true,
          },
          {
            condition: 'Skin Infection (Bacterial)',
            confidence: 68,
            severity: 'mild' as const,
            recommendations: [
              'Clean with antiseptic twice daily',
              'Apply topical antibiotic ointment',
              'Keep area dry and well-ventilated',
              'Monitor for signs of spreading',
              'Return in 3 days for follow-up',
              'Seek immediate care if red streaking appears',
            ],
            referralNeeded: false,
          },
          {
            condition: 'Wound/Ulcer (Unspecified)',
            confidence: 58,
            severity: 'moderate' as const,
            recommendations: [
              'Thorough wound cleaning with saline',
              'Assess depth and surrounding tissue',
              'Apply appropriate wound dressing',
              'Tetanus prophylaxis if indicated',
              'Daily wound assessment and care',
              'Referral if no improvement in 5 days',
            ],
            referralNeeded: true,
          },
        ];

        // Randomly select one of the mock results
        const result =
          mockResults[Math.floor(Math.random() * mockResults.length)];
        resolve(result);
      }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds delay
    });
  }

  private static getConditionName(diseaseKey: string): string {
    const conditionNames = {
      malaria: 'Malaria (Suspected)',
      buruliUlcer: 'Buruli Ulcer (Possible)',
      skinInfection: 'Skin Infection',
      viral: 'Common Viral Infection',
    };

    return (
      conditionNames[diseaseKey as keyof typeof conditionNames] ||
      'Unknown Condition'
    );
  }

  static getConfidenceLevel(confidence: number): 'low' | 'medium' | 'high' {
    if (confidence >= 70) return 'high';
    if (confidence >= 50) return 'medium';
    return 'low';
  }

  static shouldRecommendReferral(
    diagnosis: DiagnosisResult | ImageAnalysis
  ): boolean {
    if ('referralNeeded' in diagnosis) {
      return diagnosis.referralNeeded;
    }

    return diagnosis.confidence > 70 && diagnosis.urgency === 'high';
  }
}
