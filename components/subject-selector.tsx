"use client";

import { SubjectName, subjectsCredits } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SubjectSelectorProps {
  availableSubjects: SubjectName[];
  onAddSubject: (subject: SubjectName) => void;
}

export function SubjectSelector({ availableSubjects, onAddSubject }: SubjectSelectorProps) {
  if (availableSubjects.length === 0) {
    return null;
  }

  return (
    <Select onValueChange={onAddSubject}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Add a subject" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[300px]">
          {availableSubjects.map(subject => (
            <SelectItem key={subject} value={subject}>
              {subject} ({subjectsCredits[subject]} credits)
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}