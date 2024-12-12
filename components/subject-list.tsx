"use client";

import { Subject, Grade } from '@/lib/types';
import { SubjectCard } from './subject-card';

interface SubjectListProps {
  subjects: Subject[];
  onUpdateGrade: (name: Subject['name'], grade: Grade) => void;
  onRemoveSubject: (name: Subject['name']) => void;
}

export function SubjectList({ subjects, onUpdateGrade, onRemoveSubject }: SubjectListProps) {
  if (subjects.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No subjects added yet. Use the dropdown above to add subjects.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {subjects.map(subject => (
        <SubjectCard
          key={subject.name}
          subject={subject}
          onUpdateGrade={onUpdateGrade}
          onRemoveSubject={onRemoveSubject}
        />
      ))}
    </div>
  );
}