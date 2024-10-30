"use client";
import React from "react";
import { Grade } from "../types";

interface GradeInputProps {
  index: number;
  grade: Grade;
  credit: number;
  onGradeChange: (index: number, grade: Grade) => void;
  onCreditChange: (index: number, credit: number) => void;
}

const gradeOptions: { label: Grade; value: number }[] = [
  { label: "A", value: 10 },
  { label: "A-", value: 9 },
  { label: "B", value: 8 },
  { label: "B-", value: 7 },
  { label: "C", value: 6 },
  { label: "C-", value: 5 },
  { label: "D", value: 4 },
  { label: "E", value: 3 },
];

const GradeInput: React.FC<GradeInputProps> = ({
  index,
  grade,
  credit,
  onGradeChange,
  onCreditChange,
}) => {
  return (
    <div className="flex mb-2">
      <select
        className="mr-2 border p-1"
        value={grade}
        onChange={(e) => onGradeChange(index, e.target.value as Grade)}
      >
        <option value="">Select Grade</option>
        {gradeOptions.map((option) => (
          <option key={option.label} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        type="number"
        className="border p-1 w-16"
        placeholder="Credits"
        value={credit}
        onChange={(e) => onCreditChange(index, Number(e.target.value))}
      />
    </div>
  );
};

export default GradeInput;
