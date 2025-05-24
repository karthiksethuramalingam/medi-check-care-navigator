
import { treatmentDurations, defaultHospitals, hospitalCosts, liveWaitTimes, hospitalQueues, HospitalWaitTime } from '../data/waitTimeData';

export class WaitTimeCalculator {
  private queueState: { [key: string]: number } = { ...hospitalQueues };

  constructor() {
    // Initialize with current queue state
    Object.keys(hospitalQueues).forEach(hospital => {
      this.queueState[hospital] = hospitalQueues[hospital];
    });
  }

  calculateWaitTimes(injuryType: string): HospitalWaitTime[] {
    const treatment = treatmentDurations.find(t => t.injuryType === injuryType);
    if (!treatment) {
      console.error(`Treatment duration not found for injury: ${injuryType}`);
      return [];
    }

    const severityMultiplier = this.getSeverityMultiplier(treatment.severity);

    return defaultHospitals.map(hospital => {
      const baseLiveWait = liveWaitTimes[hospital as keyof typeof liveWaitTimes] || 60;
      const queueWait = this.queueState[hospital] || 0;
      
      // Apply severity weighting - higher severity gets priority (lower wait)
      const adjustedWait = Math.max(5, Math.floor((baseLiveWait + queueWait) * severityMultiplier));
      
      const cost = this.calculateCost(hospital, treatment.appointmentTime);

      let type: 'public' | 'private' | 'gp' = 'public';
      if (hospital === 'Wakefield Hospital') type = 'private';
      else if (hospital.includes('Medical Centre') || hospital.includes('Health Centre')) type = 'gp';

      return {
        hospital,
        waitMinutes: adjustedWait,
        cost,
        type,
        canJoinQueue: true
      };
    });
  }

  private getSeverityMultiplier(severity: string): number {
    switch (severity) {
      case 'critical': return 0.2; // 80% reduction for critical
      case 'high': return 0.5; // 50% reduction for high
      case 'medium': return 0.8; // 20% reduction for medium  
      case 'low': return 1.0; // No reduction for low
      default: return 1.0;
    }
  }

  private calculateCost(hospital: string, treatmentTime: number): string {
    const costs = hospitalCosts[hospital as keyof typeof hospitalCosts];
    
    switch (hospital) {
      case 'Wellington Hospital':
        return 'Free (NZ residents)';
      case 'Wakefield Hospital':
        return 'Quote on request';
      case 'City Medical Centre':
        return '$60-78 (age dependent)';
      case 'Wellington After Hours Medical Centre':
        return '$65+ (varies)';
      case 'Wakefield Health Centre':
        return '$40-57 (age dependent)';
      default:
        return 'Contact for pricing';
    }
  }

  addToQueue(hospital: string, injuryType: string): boolean {
    const treatment = treatmentDurations.find(t => t.injuryType === injuryType);
    if (treatment && this.queueState[hospital] !== undefined) {
      // Add treatment time to hospital queue
      this.queueState[hospital] += treatment.appointmentTime;
      // Update global queue state
      hospitalQueues[hospital] = this.queueState[hospital];
      return true;
    }
    return false;
  }

  getFastestOption(waitTimes: HospitalWaitTime[]): HospitalWaitTime | null {
    if (waitTimes.length === 0) return null;
    return waitTimes.reduce((fastest, current) => 
      current.waitMinutes < fastest.waitMinutes ? current : fastest
    );
  }
}
