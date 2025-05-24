
export interface HospitalWaitTime {
  hospital: string;
  waitMinutes: number;
  cost: number;
  type: 'public' | 'private' | 'gp';
}

export interface TreatmentDuration {
  injuryType: string;
  appointmentTime: number;
  standardDeviation: number;
}

export const defaultHospitals = [
  "Wellington Hospital",
  "Wakefield Hospital", 
  "City Medical Centre",
  "Wellington Accident and Emergency Services"
];

export const treatmentDurations: TreatmentDuration[] = [
  { injuryType: "Head and Neurological Injuries: Concussion", appointmentTime: 45, standardDeviation: 15 },
  { injuryType: "Head and Neurological Injuries: Traumatic Brain Injury (TBI)", appointmentTime: 120, standardDeviation: 30 },
  { injuryType: "Head and Neurological Injuries: Skull Fracture", appointmentTime: 90, standardDeviation: 25 },
  { injuryType: "Head and Neurological Injuries: Scalp Laceration", appointmentTime: 30, standardDeviation: 10 },
  { injuryType: "Head and Neurological Injuries: Intracranial Haemorrhage", appointmentTime: 180, standardDeviation: 45 },
  { injuryType: "Head and Neurological Injuries: Seizure-Related Injury", appointmentTime: 60, standardDeviation: 20 },
  { injuryType: "Orthopedic Injuries: Fracture (Open/Closed)", appointmentTime: 75, standardDeviation: 20 },
  { injuryType: "Orthopedic Injuries: Dislocation", appointmentTime: 45, standardDeviation: 15 },
  { injuryType: "Orthopedic Injuries: Sprains and Strains", appointmentTime: 25, standardDeviation: 8 },
  { injuryType: "Orthopedic Injuries: Tendon/Ligament Injury", appointmentTime: 40, standardDeviation: 12 },
  { injuryType: "Orthopedic Injuries: Crush Injury", appointmentTime: 90, standardDeviation: 25 },
  { injuryType: "Orthopedic Injuries: Joint Injury (ACL Tear)", appointmentTime: 50, standardDeviation: 15 },
  { injuryType: "Orthopedic Injuries: Spinal Injury", appointmentTime: 120, standardDeviation: 35 },
  { injuryType: "Burns and Cold Injuries: Thermal Burn (3rd Degree)", appointmentTime: 60, standardDeviation: 20 },
  { injuryType: "Burns and Cold Injuries: Chemical Burn", appointmentTime: 45, standardDeviation: 15 },
  { injuryType: "Burns and Cold Injuries: Electrical Burn", appointmentTime: 75, standardDeviation: 25 },
  { injuryType: "Burns and Cold Injuries: Radiation Burn", appointmentTime: 90, standardDeviation: 30 },
  { injuryType: "Burns and Cold Injuries: Frostbite", appointmentTime: 35, standardDeviation: 12 },
  { injuryType: "Burns and Cold Injuries: Hypothermia Tissue Damage", appointmentTime: 60, standardDeviation: 20 },
  { injuryType: "Cardiovascular Emergencies: Penetrating Chest Trauma", appointmentTime: 150, standardDeviation: 40 },
  { injuryType: "Cardiovascular Emergencies: Blunt Cardiac Injury", appointmentTime: 120, standardDeviation: 35 },
  { injuryType: "Cardiovascular Emergencies: Rib Fracture (Flail Chest)", appointmentTime: 90, standardDeviation: 25 },
  { injuryType: "Cardiovascular Emergencies: Aortic Rupture", appointmentTime: 180, standardDeviation: 50 },
  { injuryType: "Cardiovascular Emergencies: Hemorrhagic Shock", appointmentTime: 120, standardDeviation: 35 },
  { injuryType: "Respiratory Injuries: Pneumothorax", appointmentTime: 75, standardDeviation: 20 },
  { injuryType: "Respiratory Injuries: Hemothorax", appointmentTime: 90, standardDeviation: 25 },
  { injuryType: "Respiratory Injuries: Airway Obstruction", appointmentTime: 30, standardDeviation: 10 },
  { injuryType: "Respiratory Injuries: Aspiration", appointmentTime: 45, standardDeviation: 15 },
  { injuryType: "Respiratory Injuries: Smoke Inhalation", appointmentTime: 60, standardDeviation: 20 },
  { injuryType: "Respiratory Injuries: Tracheal Rupture", appointmentTime: 120, standardDeviation: 35 }
];

export const hospitalCosts = {
  "Wellington Hospital": { base: 0, additional: 50 }, // Public hospital
  "Wakefield Hospital": { base: 350, additional: 150 }, // Private hospital
  "City Medical Centre": { base: 80, additional: 30 }, // GP clinic
  "Wellington Accident and Emergency Services": { base: 0, additional: 75 } // Public A&E
};
