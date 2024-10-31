import React, { useState, useEffect } from "react";
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

const LOCAL_STORAGE_KEY = "cgpaCalculatorData";

const CGPACalculator: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [cgpa, setCgpa] = useState<number | null>(null);
  const [isClient, setIsClient] = useState(false); // New state to track client-side rendering

  // Wait until the component mounts on the client before loading data from localStorage
  useEffect(() => {
    setIsClient(true); // Mark that the component is now on the client side
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      setSubjects(JSON.parse(savedData));
    }
  }, []);

  // Save subjects to localStorage whenever they change, but only on the client side
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subjects));
    }
  }, [subjects, isClient]);

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

  const clearData = () => {
    setSubjects([]);
    setCgpa(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  if (!isClient) return null; // Avoid rendering until client-side mount is confirmed

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CGPA Calculator</h1>
      <div className="flex mb-2 column-2">
        {/* <div className="w-16 font-bold text-lg">Subject</div> */}
        <div className="ml-2 w-16 font-bold text-lg">Credits</div>
        <div className="ml-2 font-bold text-lg">Grade</div>
      </div>
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
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-4"
        onClick={clearData}
      >
        Clear Data
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
