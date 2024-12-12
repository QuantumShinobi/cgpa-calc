// Utility functions for CGPA calculations
import { Subject, GRADES } from '@/lib/types';

export function calculateCGPA(subjects: Subject[]): string {
  if (!subjects || subjects.length === 0) return '0.00';

  const totalCredits = subjects.reduce((sum, subject) => 
    subject.grade ? sum + subject.credits : sum, 0);
  
  const weightedSum = subjects.reduce((sum, subject) => {
    if (!subject.grade) return sum;
    const gradeValue = GRADES[subject.grade];
    return sum + (gradeValue * subject.credits);
  }, 0);

  return totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : '0.00';
}

export function calculateCreditsDistribution(subjects: Subject[]) {
  return subjects.reduce((acc, subject) => {
    const credits = subject.credits;
    const grade = subject.grade || 'Not Graded';
    const existingEntry = acc.find(item => item.grade === grade);
    
    if (existingEntry) {
      existingEntry.credits += credits;
    } else {
      acc.push({ grade, credits });
    }
    
    return acc;
  }, [] as { grade: string; credits: number }[]);
}