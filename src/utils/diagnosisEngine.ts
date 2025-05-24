
import { headers, injuryDatabase, InjuryData } from '../data/injuryData';

export class DiagnosisEngine {
  private candidates: InjuryData[];
  private asked: Set<number>;

  constructor() {
    this.candidates = [...injuryDatabase];
    this.asked = new Set();
  }

  reset() {
    this.candidates = [...injuryDatabase];
    this.asked = new Set();
  }

  getBestQuestion(): string | null {
    const n = headers.length;
    let bestIdx: number | null = null;
    let bestDiff = 1.0;

    for (let i = 0; i < n; i++) {
      if (this.asked.has(i)) {
        continue;
      }

      const ones = this.candidates.reduce((sum, c) => sum + c.symptoms[i], 0);
      const zeros = this.candidates.length - ones;
      const diff = Math.abs(ones - zeros) / this.candidates.length;

      if (diff < bestDiff) {
        bestDiff = diff;
        bestIdx = i;
      }
    }

    return bestIdx !== null ? headers[bestIdx] : null;
  }

  getCurrentQuestionIndex(): number | null {
    const n = headers.length;
    let bestIdx: number | null = null;
    let bestDiff = 1.0;

    for (let i = 0; i < n; i++) {
      if (this.asked.has(i)) {
        continue;
      }

      const ones = this.candidates.reduce((sum, c) => sum + c.symptoms[i], 0);
      const zeros = this.candidates.length - ones;
      const diff = Math.abs(ones - zeros) / this.candidates.length;

      if (diff < bestDiff) {
        bestDiff = diff;
        bestIdx = i;
      }
    }

    return bestIdx;
  }

  answerQuestion(answer: boolean): void {
    const questionIdx = this.getCurrentQuestionIndex();
    if (questionIdx === null) return;

    const val = answer ? 1 : 0;
    this.candidates = this.candidates.filter(c => c.symptoms[questionIdx] === val);
    this.asked.add(questionIdx);
  }

  getDiagnosis(): string | null {
    if (this.candidates.length === 1) {
      return this.candidates[0].name;
    }
    if (this.candidates.length === 0) {
      return "No matching diagnosis found";
    }
    return null; // Still need more questions
  }

  getCandidateCount(): number {
    return this.candidates.length;
  }

  getProgress(): number {
    return (this.asked.size / headers.length) * 100;
  }
}
