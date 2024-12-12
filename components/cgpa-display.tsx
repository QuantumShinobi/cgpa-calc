"use client";

import { Calculator } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CGPADisplayProps {
  cgpa: string;
  totalCredits: number;
}

export function CGPADisplay({ cgpa, totalCredits }: CGPADisplayProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium text-muted-foreground">CGPA</span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{cgpa}</div>
          <div className="text-sm text-muted-foreground">
            Total Credits: {totalCredits}
          </div>
        </div>
      </div>
    </Card>
  );
}