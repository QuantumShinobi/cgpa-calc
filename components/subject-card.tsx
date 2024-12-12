"use client";

import { Subject, GRADES, Grade } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface SubjectCardProps {
  subject: Subject;
  onUpdateGrade: (name: Subject['name'], grade: Grade) => void;
  onRemoveSubject: (name: Subject['name']) => void;
}

export function SubjectCard({ subject, onUpdateGrade, onRemoveSubject }: SubjectCardProps) {
  return (
    <Card className="p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate text-sm sm:text-base">{subject.name}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">{subject.credits} credits</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={subject.grade}
            onValueChange={(value) => onUpdateGrade(subject.name, value as Grade)}
          >
            <SelectTrigger className="w-full sm:w-[100px]">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(GRADES).map(([grade]) => (
                <SelectItem key={grade} value={grade}>
                  {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveSubject(subject.name)}
            className="text-destructive hover:bg-destructive/10"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove subject</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}