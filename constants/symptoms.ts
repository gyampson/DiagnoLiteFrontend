export interface Symptom {
  id: string;
  name: string;
  description: string;
  relatedDiseases: string[];
}

export const symptoms: Symptom[] = [
  {
    id: "fever",
    name: "Fever",
    description: "Elevated body temperature above the normal range of 36.5-37.5°C (97.7-99.5°F)",
    relatedDiseases: ["malaria", "skin-infection"]
  },
  {
    id: "chills",
    name: "Chills",
    description: "Feeling of coldness accompanied by shivering",
    relatedDiseases: ["malaria"]
  },
  {
    id: "headache",
    name: "Headache",
    description: "Pain in any region of the head",
    relatedDiseases: ["malaria"]
  },
  {
    id: "nausea",
    name: "Nausea and Vomiting",
    description: "Feeling of sickness with an inclination to vomit",
    relatedDiseases: ["malaria"]
  },
  {
    id: "fatigue",
    name: "Fatigue",
    description: "Extreme tiredness resulting from mental or physical exertion",
    relatedDiseases: ["malaria"]
  },
  {
    id: "skin-nodules",
    name: "Skin Nodules",
    description: "Small, solid lumps under the skin",
    relatedDiseases: ["buruli-ulcer"]
  },
  {
    id: "swelling",
    name: "Swelling",
    description: "Enlargement of a body part caused by fluid accumulation",
    relatedDiseases: ["buruli-ulcer", "skin-infection"]
  },
  {
    id: "ulcers",
    name: "Skin Ulcers",
    description: "Open sores on the skin that don't heal properly",
    relatedDiseases: ["buruli-ulcer"]
  },
  {
    id: "skin-redness",
    name: "Skin Redness",
    description: "Redness of the skin due to increased blood flow",
    relatedDiseases: ["skin-infection"]
  },
  {
    id: "skin-pain",
    name: "Skin Pain or Tenderness",
    description: "Pain or sensitivity when touching affected skin area",
    relatedDiseases: ["skin-infection"]
  },
  {
    id: "blisters",
    name: "Blisters",
    description: "Fluid-filled sacs on the skin",
    relatedDiseases: ["skin-infection"]
  }
];