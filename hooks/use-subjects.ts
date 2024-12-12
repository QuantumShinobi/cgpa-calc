"use client";

import { useEffect, useState } from 'react';
import { Subject, SubjectName, subjectsCredits, Grade } from '@/lib/types';

const STORAGE_KEY = 'cgpa-calculator-subjects';

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  
  useEffect(() => {
    // Load data from localStorage only after component mounts
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSubjects(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored subjects:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever subjects change
    if (subjects.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
    }
  }, [subjects]);

  const addSubject = (name: SubjectName) => {
    setSubjects(prev => [
      ...prev,
      {
        name,
        credits: subjectsCredits[name],
      }
    ]);
  };

  const updateGrade = (name: SubjectName, grade: Grade) => {
    setSubjects(prev =>
      prev.map(subject =>
        subject.name === name
          ? { ...subject, grade }
          : subject
      )
    );
  };

  const removeSubject = (name: SubjectName) => {
    setSubjects(prev => prev.filter(subject => subject.name !== name));
  };

  const clearSubjects = () => {
    setSubjects([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    subjects,
    addSubject,
    updateGrade,
    removeSubject,
    clearSubjects,
  };
}