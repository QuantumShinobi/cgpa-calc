'use client';

import { useSubjects } from '@/hooks/use-subjects';
import { Card } from '@/components/ui/card';
import { SubjectList } from './cgpa/subject-list';
import { SubjectSelector } from './cgpa/subject-selector';
import { CGPADisplay } from './cgpa/cgpa-display';
import { ExportButtons } from './cgpa/export-buttons';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { subjectsCredits, SubjectName } from '@/lib/types';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function CGPACalculator() {
  const {
    subjects,
    addSubject,
    updateGrade,
    removeSubject,
    clearSubjects,
    calculateCGPA,
  } = useSubjects();
  const { toast } = useToast();

  const handleClear = () => {
    clearSubjects();
    toast({
      title: 'Data Cleared',
      description:
        'All subjects have been removed and local storage has been cleared.',
    });
  };

  const cgpa = calculateCGPA();
  const availableSubjects = Object.keys(subjectsCredits).filter(
    (name) => !subjects.some((s) => s.name === name)
  ) as SubjectName[];

  return (
    <div className="container py-7 lg:pl-5 sm:px-5 md:px-5 m-3 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Your Subjects</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear all data?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all
                your subjects and grades.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClear}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <CGPADisplay
          cgpa={cgpa}
          totalCredits={subjects.reduce((sum, s) => sum + s.credits, 0)}
        />
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Quick Stats</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Total Subjects</dt>
                <dd className="font-medium">{subjects.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Graded Subjects</dt>
                <dd className="font-medium">
                  {subjects.filter((s) => s.grade).length}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Pending Grades</dt>
                <dd className="font-medium">
                  {subjects.filter((s) => !s.grade).length}
                </dd>
              </div>
            </dl>
          </div>
        </Card>
      </div>

      <Card className="p-6">
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

      <div className="flex justify-end">
        <ExportButtons subjects={subjects} cgpa={cgpa} />
      </div>
    </div>
  );
}
