"use client";

import { useEffect, useState } from 'react';
import { Subject, GRADES, subjectsCredits } from '../types';

export const useCGPA = () => {
  const [subjects, setSubjects] = useState<Subject[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cgpaSubjects');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [cgpa, setCGPA] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cgpaSubjects', JSON.stringify(subjects));
    }
    
    const totalCredits = subjects.reduce((sum, subject) => 
      subject.grade ? sum + subject.credits : sum, 0);
    
    const weightedSum = subjects.reduce((sum, subject) => {
      if (!subject.grade) return sum;
      const gradeValue = GRADES.find(g => g.label === subject.grade)?.value || 0;
      return sum + (gradeValue * subject.credits);
    }, 0);

    setCGPA(totalCredits > 0 ? Number((weightedSum / totalCredits).toFixed(2)) : 0);
  }, [subjects]);

  const addSubject = (name: string) => {
    if (subjects.some(s => s.name === name)) return;
    setSubjects([...subjects, {
      name,
      credits: subjectsCredits[name as keyof typeof subjectsCredits],
    }]);
  };

  const removeSubject = (name: string) => {
    setSubjects(subjects.filter(s => s.name !== name));
  };

  const updateGrade = (name: string, grade: string) => {
    setSubjects(subjects.map(s => 
      s.name === name ? { ...s, grade } : s
    ));
  };

  const getRemainingSubjects = () => {
    return Object.keys(subjectsCredits).filter(
      name => !subjects.some(s => s.name === name)
    );
  };

  return {
    subjects,
    cgpa,
    addSubject,
    removeSubject,
    updateGrade,
    getRemainingSubjects,
  };
};