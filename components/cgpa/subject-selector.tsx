"use client";

import { SubjectName, subjectsCredits } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface SubjectSelectorProps {
  availableSubjects: SubjectName[];
  onAddSubject: (subject: SubjectName) => void;
}

export function SubjectSelector({ availableSubjects, onAddSubject }: SubjectSelectorProps) {
  if (availableSubjects.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        All subjects have been added
      </div>
    );
  }

  return (
    <Select onValueChange={onAddSubject}>
      <SelectTrigger>
        <SelectValue placeholder="Add a subject" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[300px]">
          {availableSubjects.map(subject => (
            <SelectItem key={subject} value={subject} className="flex items-center justify-between">
              <span className="truncate">{subject}</span>
              <Badge variant="secondary" className="ml-2">
                {subjectsCredits[subject]} credits
              </Badge>
            </SelectItem>
          ))}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}