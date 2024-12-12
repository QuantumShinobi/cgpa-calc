"use client";

import { Subject, GRADES, Grade } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SubjectCardProps {
  subject: Subject;
  onUpdateGrade: (name: Subject['name'], grade: Grade) => void;
  onRemoveSubject: (name: Subject['name']) => void;
}

export function SubjectCard({ subject, onUpdateGrade, onRemoveSubject }: SubjectCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md">
      <div className="absolute left-0 top-0 h-full w-1 bg-primary/10 group-hover:bg-primary/20" />
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
              <div>
                <h3 className="font-medium leading-none">{subject.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="rounded-md">
                    {subject.credits} credits
                  </Badge>
                  {subject.grade && (
                    <Badge variant="outline" className="rounded-md">
                      Grade: {subject.grade} ({GRADES[subject.grade]})
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select
              value={subject.grade}
              onValueChange={(value) => onUpdateGrade(subject.name, value as Grade)}
            >
              <SelectTrigger className="w-[120px]">
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
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove subject</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}