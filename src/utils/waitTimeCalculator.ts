
import { treatmentDurations, defaultHospitals, hospitalCosts, HospitalWaitTime } from '../data/waitTimeData';

export class WaitTimeCalculator {
  private hospitalQueues: { [key: string]: number } = {};

  constructor() {
    defaultHospitals.forEach(hospital => {
      this.hospitalQueues[hospital] = Math.floor(Math.random() * 120); // Random initial wait times
    });
  }

  calculateWaitTimes(injuryType: string): HospitalWaitTime[] {
    const treatment = treatmentDurations.find(t => t.injuryType === injuryType);
    if (!treatment) {
      console.error(`Treatment duration not found for injury: ${injuryType}`);
      return [];
    }

    return defaultHospitals.map(hospital => {
      const baseWait = this.hospitalQueues[hospital] || 0;
      const treatmentTime = treatment.appointmentTime;
      const totalWait = baseWait + treatmentTime + Math.floor(Math.random() * 30); // Add some variability
      
      const costs = hospitalCosts[hospital as keyof typeof hospitalCosts];
      const totalCost = costs.base + Math.floor(treatmentTime / 30) * costs.additional;

      let type: 'public' | 'private' | 'gp' = 'public';
      if (hospital === 'Wakefield Hospital') type = 'private';
      else if (hospital === 'City Medical Centre') type = 'gp';

      return {
        hospital,
        waitMinutes: totalWait,
        cost: totalCost,
        type
      };
    });
  }

  addToQueue(hospital: string, injuryType: string): void {
    const treatment = treatmentDurations.find(t => t.injuryType === injuryType);
    if (treatment && this.hospitalQueues[hospital] !== undefined) {
      this.hospitalQueues[hospital] += treatment.appointmentTime;
    }
  }

  getFastestOption(waitTimes: HospitalWaitTime[]): HospitalWaitTime | null {
    if (waitTimes.length === 0) return null;
    return waitTimes.reduce((fastest, current) => 
      current.waitMinutes < fastest.waitMinutes ? current : fastest
    );
  }
}
