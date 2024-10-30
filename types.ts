export type Grade = 'A' | 'A-' | 'B' | 'B-' | 'C' | 'C-' | 'D' | 'E';

export interface Subject {
  grade: Grade;
  credit: number;
}
