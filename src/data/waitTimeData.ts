
export interface HospitalWaitTime {
  hospital: string;
  waitMinutes: number;
  cost: number | string;
  type: 'public' | 'private' | 'gp';
  canJoinQueue: boolean;
}

export interface TreatmentDuration {
  injuryType: string;
  appointmentTime: number;
  standardDeviation: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const defaultHospitals = [
  "Wellington Hospital",
  "Wakefield Hospital", 
  "City Medical Centre",
  "Wellington After Hours Medical Centre",
  "Wakefield Health Centre"
];

// Live wait times (simulating real-time data)
export const liveWaitTimes = {
  "Wellington Hospital": 324,
  "Wakefield Hospital": 118,
  "City Medical Centre": 75,
  "Wellington After Hours Medical Centre": 265,
  "Wakefield Health Centre": 40
};

// Queue tracking for users joining waitlists
export const hospitalQueues = {
  "Wellington Hospital": 0,
  "Wakefield Hospital": 0,
  "City Medical Centre": 0,
  "Wellington After Hours Medical Centre": 0,
  "Wakefield Health Centre": 0
};

export const treatmentDurations: TreatmentDuration[] = [
  { injuryType: "Head and Neurological Injuries: Concussion", appointmentTime: 45, standardDeviation: 15, severity: 'medium' },
  { injuryType: "Head and Neurological Injuries: Traumatic Brain Injury (TBI)", appointmentTime: 120, standardDeviation: 30, severity: 'critical' },
  { injuryType: "Head and Neurological Injuries: Skull Fracture", appointmentTime: 90, standardDeviation: 25, severity: 'high' },
  { injuryType: "Head and Neurological Injuries: Scalp Laceration", appointmentTime: 30, standardDeviation: 10, severity: 'low' },
  { injuryType: "Head and Neurological Injuries: Intracranial Haemorrhage", appointmentTime: 180, standardDeviation: 45, severity: 'critical' },
  { injuryType: "Head and Neurological Injuries: Seizure-Related Injury", appointmentTime: 60, standardDeviation: 20, severity: 'high' },
  { injuryType: "Orthopedic Injuries: Fracture (Open/Closed)", appointmentTime: 75, standardDeviation: 20, severity: 'medium' },
  { injuryType: "Orthopedic Injuries: Dislocation", appointmentTime: 45, standardDeviation: 15, severity: 'medium' },
  { injuryType: "Orthopedic Injuries: Sprains and Strains", appointmentTime: 25, standardDeviation: 8, severity: 'low' },
  { injuryType: "Orthopedic Injuries: Tendon/Ligament Injury", appointmentTime: 40, standardDeviation: 12, severity: 'low' },
  { injuryType: "Orthopedic Injuries: Crush Injury", appointmentTime: 90, standardDeviation: 25, severity: 'high' },
  { injuryType: "Orthopedic Injuries: Joint Injury (ACL Tear)", appointmentTime: 50, standardDeviation: 15, severity: 'medium' },
  { injuryType: "Orthopedic Injuries: Spinal Injury", appointmentTime: 120, standardDeviation: 35, severity: 'critical' },
  { injuryType: "Burns and Cold Injuries: Thermal Burn (3rd Degree)", appointmentTime: 60, standardDeviation: 20, severity: 'high' },
  { injuryType: "Burns and Cold Injuries: Chemical Burn", appointmentTime: 45, standardDeviation: 15, severity: 'high' },
  { injuryType: "Burns and Cold Injuries: Electrical Burn", appointmentTime: 75, standardDeviation: 25, severity: 'high' },
  { injuryType: "Burns and Cold Injuries: Radiation Burn", appointmentTime: 90, standardDeviation: 30, severity: 'high' },
  { injuryType: "Burns and Cold Injuries: Frostbite", appointmentTime: 35, standardDeviation: 12, severity: 'medium' },
  { injuryType: "Burns and Cold Injuries: Hypothermia Tissue Damage", appointmentTime: 60, standardDeviation: 20, severity: 'medium' },
  { injuryType: "Cardiovascular Emergencies: Penetrating Chest Trauma", appointmentTime: 150, standardDeviation: 40, severity: 'critical' },
  { injuryType: "Cardiovascular Emergencies: Blunt Cardiac Injury", appointmentTime: 120, standardDeviation: 35, severity: 'critical' },
  { injuryType: "Cardiovascular Emergencies: Rib Fracture (Flail Chest)", appointmentTime: 90, standardDeviation: 25, severity: 'high' },
  { injuryType: "Cardiovascular Emergencies: Aortic Rupture", appointmentTime: 180, standardDeviation: 50, severity: 'critical' },
  { injuryType: "Cardiovascular Emergencies: Hemorrhagic Shock", appointmentTime: 120, standardDeviation: 35, severity: 'critical' },
  { injuryType: "Respiratory Injuries: Pneumothorax", appointmentTime: 75, standardDeviation: 20, severity: 'high' },
  { injuryType: "Respiratory Injuries: Hemothorax", appointmentTime: 90, standardDeviation: 25, severity: 'high' },
  { injuryType: "Respiratory Injuries: Airway Obstruction", appointmentTime: 30, standardDeviation: 10, severity: 'critical' },
  { injuryType: "Respiratory Injuries: Aspiration", appointmentTime: 45, standardDeviation: 15, severity: 'high' },
  { injuryType: "Respiratory Injuries: Smoke Inhalation", appointmentTime: 60, standardDeviation: 20, severity: 'high' },
  { injuryType: "Respiratory Injuries: Tracheal Rupture", appointmentTime: 120, standardDeviation: 35, severity: 'critical' },
  { injuryType: "No Injury", appointmentTime: 0, standardDeviation: 0, severity: 'low' }
];

export const hospitalCosts = {
  "Wellington Hospital": {
    enrolled: "Free (NZ residents/ACC approved)",
    nonResident: "Full treatment costs",
    type: "public"
  },
  "Wakefield Hospital": {
    consultation: "Available upon request",
    note: "Prepayment required, additional charges may apply",
    type: "private"
  },
  "City Medical Centre": {
    under6: "Free",
    age6to13: "Free", 
    age14to17: "$60.00",
    age18to24: "$78.00",
    age25to64: "$78.00",
    age65plus: "$68.00",
    csc: "$19.50 (18+) / $13.00 (14-17)",
    type: "gp"
  },
  "Wellington After Hours Medical Centre": {
    consultation: "Varies by condition",
    fracture: "$65.00",
    note: "Reduced charges for high-needs groups",
    type: "gp"
  },
  "Wakefield Health Centre": {
    under14: "Free",
    age14to18: "$40.00",
    age18to24: "$53.00", 
    age25to64: "$57.00",
    age65plus: "$53.00",
    acc: "$40.00 (18+) / $29.00 (14-18)",
    csc: "$19.50 (18+) / $13.00 (14-17)",
    type: "gp"
  }
};
