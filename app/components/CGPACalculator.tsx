"use client";

import { useState } from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GRADES } from '../types';
import { useCGPA } from '../hooks/useCGPA';

export function CGPACalculator() {
  const { subjects, cgpa, addSubject, removeSubject, updateGrade, getRemainingSubjects } = useCGPA();
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  const handleAddSubject = () => {
    if (selectedSubject) {
      addSubject(selectedSubject);
      setSelectedSubject('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <GraduationCap className="w-16 h-16 mx-auto text-primary" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">CGPA Calculator</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Calculate your Cumulative Grade Point Average</p>
        </div>

        <Card className="p-6 shadow-lg">
          <div className="space-y-6">
            <div className="flex gap-4">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {getRemainingSubjects().map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddSubject} disabled={!selectedSubject}>
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject.name} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{subject.name}</p>
                    <p className="text-sm text-gray-500">Credits: {subject.credits}</p>
                  </div>
                  <Select value={subject.grade} onValueChange={(grade) => updateGrade(subject.name, grade)}>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADES.map((grade) => (
                        <SelectItem key={grade.label} value={grade.label}>
                          {grade.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeSubject(subject.name)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-primary text-primary-foreground">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Current CGPA</h2>
            <p className="text-4xl font-bold">{cgpa}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}