"use client";
import React, { useState } from "react";
import GradeInput from "./GradeInput";
import { Subject, Grade } from "../types";

const gradeValues: Record<Grade, number> = {
  A: 10,
  "A-": 9,
  B: 8,
  "B-": 7,
  C: 6,
  "C-": 5,
  D: 4,
  E: 3,
};

const CGPACalculator: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [cgpa, setCgpa] = useState<number | null>(null);

  const addSubject = () => {
    setSubjects([...subjects, { grade: "A", credit: 0 }]);
  };

  const updateGrade = (index: number, grade: Grade) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].grade = grade;
    setSubjects(updatedSubjects);
  };

  const updateCredit = (index: number, credit: number) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].credit = credit;
    setSubjects(updatedSubjects);
  };

  const calculateCGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    subjects.forEach(({ grade, credit }) => {
      totalGradePoints += gradeValues[grade] * credit;
      totalCredits += credit;
    });

    if (totalCredits > 0) {
      setCgpa(parseFloat((totalGradePoints / totalCredits).toFixed(2)));
    } else {
      setCgpa(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CGPA Calculator</h1>
      {subjects.map((subject, index) => (
        <GradeInput
          key={index}
          index={index}
          grade={subject.grade}
          credit={subject.credit}
          onGradeChange={updateGrade}
          onCreditChange={updateCredit}
        />
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={addSubject}
      >
        Add Subject
      </button>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4"
        onClick={calculateCGPA}
      >
        Calculate CGPA
      </button>
      {cgpa !== null && (
        <div className="mt-4">
          <h2 className="text-xl">Your CGPA: {cgpa}</h2>
        </div>
      )}
    </div>
  );
};

export default CGPACalculator;
