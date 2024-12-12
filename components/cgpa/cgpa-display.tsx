"use client";

import { Card } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface CGPADisplayProps {
  cgpa: string;
  totalCredits: number;
  maxCGPA?: number;
}

export function CGPADisplay({ cgpa, totalCredits, maxCGPA = 10 }: CGPADisplayProps) {
  const progress = (parseFloat(cgpa) / maxCGPA) * 100;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="absolute right-4 top-4">
        <Award className="h-12 w-12 text-primary/10" />
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Current CGPA</h2>
          <div className="flex items-baseline space-x-2">
            <p className="text-4xl font-bold tracking-tight">{cgpa}</p>
            <p className="text-sm text-muted-foreground">/ {maxCGPA.toFixed(1)}</p>
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Credits</span>
            <span className="font-medium">{totalCredits}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}