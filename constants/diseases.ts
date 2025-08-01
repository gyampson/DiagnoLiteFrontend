export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  preventions: string[];
  imageUrl?: string;
}

export const diseases: Disease[] = [
  {
    id: "malaria",
    name: "Malaria",
    description: "A serious and sometimes fatal disease caused by a parasite that commonly infects a certain type of mosquito which feeds on humans.",
    symptoms: [
      "Fever",
      "Chills",
      "Headache",
      "Nausea and vomiting",
      "Muscle pain and fatigue",
      "Sweating",
      "Chest or abdominal pain",
      "Cough"
    ],
    causes: [
      "Plasmodium parasites transmitted by Anopheles mosquitoes",
      "Blood transfusion from infected person",
      "Sharing needles used by infected person"
    ],
    treatments: [
      "Artemisinin-based combination therapies (ACTs)",
      "Chloroquine phosphate",
      "Mefloquine",
      "Quinine sulfate with doxycycline",
      "Supportive care for symptoms"
    ],
    preventions: [
      "Use insecticide-treated mosquito nets",
      "Apply insect repellent",
      "Wear long-sleeved clothing",
      "Take preventive medications when traveling to high-risk areas",
      "Indoor residual spraying"
    ],
    imageUrl: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "buruli-ulcer",
    name: "Buruli Ulcer",
    description: "A chronic debilitating disease caused by Mycobacterium ulcerans, affecting mainly the skin and sometimes bone.",
    symptoms: [
      "Painless nodules or papules on the skin",
      "Swelling of the affected area",
      "Development of ulcers with undermined edges",
      "Destruction of skin and soft tissue",
      "Limited mobility if near joints"
    ],
    causes: [
      "Mycobacterium ulcerans bacteria",
      "Exact mode of transmission unknown",
      "May be associated with stagnant or slow-flowing water"
    ],
    treatments: [
      "Antibiotics (rifampicin and clarithromycin) for 8 weeks",
      "Wound care and dressings",
      "Surgery to remove necrotic tissue",
      "Skin grafting for large wounds",
      "Physiotherapy to prevent disabilities"
    ],
    preventions: [
      "Avoid contact with contaminated water",
      "Wear protective clothing",
      "Promptly clean and cover any wounds",
      "Early detection and treatment"
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "skin-infection",
    name: "Bacterial Skin Infection",
    description: "Infections of the skin caused by bacteria, including impetigo, cellulitis, and folliculitis.",
    symptoms: [
      "Redness and swelling",
      "Pain or tenderness",
      "Warmth in the affected area",
      "Skin rash or discoloration",
      "Pus-filled blisters or sores",
      "Fever in severe cases"
    ],
    causes: [
      "Staphylococcus bacteria",
      "Streptococcus bacteria",
      "Entry through cuts, scrapes, or insect bites",
      "Poor hygiene",
      "Weakened immune system"
    ],
    treatments: [
      "Topical antibiotics for mild infections",
      "Oral antibiotics for more severe infections",
      "Drainage of large abscesses",
      "Wound cleaning and care",
      "Pain relievers for discomfort"
    ],
    preventions: [
      "Regular handwashing",
      "Keep cuts and scrapes clean and covered",
      "Avoid sharing personal items",
      "Maintain good personal hygiene",
      "Properly clean and disinfect wounds"
    ],
    imageUrl: "https://images.unsplash.com/photo-1612776572997-76cc42e058c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];