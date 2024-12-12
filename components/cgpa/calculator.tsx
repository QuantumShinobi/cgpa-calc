"use client";

import { useSubjects } from '@/hooks/use-subjects';
import { Card } from '@/components/ui/card';
import { GraduationCap, Trash2 } from 'lucide-react';
import { SubjectList } from './subject-list';
import { SubjectSelector } from './subject-selector';
import { CGPADisplay } from './cgpa-display';
import { ThemeToggle } from '../theme-toggle';
import { ExportButtons } from './export-buttons';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { subjectsCredits, SubjectName } from '@/lib/types';
import { calculateCGPA } from '@/lib/utils/calculations';

export function CGPACalculator() {
  const { subjects, addSubject, updateGrade, removeSubject, clearSubjects } = useSubjects();
  const { toast } = useToast();

  const handleClear = () => {
    clearSubjects();
    toast({
      title: "Data Cleared",
      description: "All subjects have been removed and local storage has been cleared.",
    });
  };

  const cgpa = calculateCGPA(subjects);
  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const availableSubjects = Object.keys(subjectsCredits).filter(
    name => !subjects.some(s => s.name === name)
  ) as SubjectName[];

  return (
    <div className="container py-6 px-4 mx-auto max-w-4xl">
      <div className="space-y-6">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold">CGPA Calculator</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button 
              variant="destructive" 
              size="icon"
              onClick={handleClear}
              title="Clear all data"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <CGPADisplay cgpa={cgpa} totalCredits={totalCredits} />

        <Card className="p-4 sm:p-6">
          <div className="space-y-6">
            <SubjectSelector 
              availableSubjects={availableSubjects}
              onAddSubject={addSubject}
            />
            <SubjectList
              subjects={subjects}
              onUpdateGrade={updateGrade}
              onRemoveSubject={removeSubject}
            />
          </div>
        </Card>

        {subjects.length > 0 && (
          <div className="flex justify-end">
            <ExportButtons subjects={subjects} cgpa={cgpa} />
          </div>
        )}
      </div>
    </div>
  );
}