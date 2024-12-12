"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';
import { Subject } from '@/lib/types';

interface CreditsChartProps {
  subjects: Subject[];
}

export function CreditsChart({ subjects }: CreditsChartProps) {
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  const data = subjects.reduce((acc, subject) => {
    const credits = subject.credits;
    const grade = subject.grade || 'Not Graded';
    const existingEntry = acc.find(item => item.grade === grade);
    
    if (existingEntry) {
      existingEntry.credits += credits;
    } else {
      acc.push({ grade, credits });
    }
    
    return acc;
  }, [] as { grade: string; credits: number }[]);

  if (subjects.length === 0) {
    return null;
  }

  return (
    <Card className="p-3 sm:p-4 h-[300px] sm:h-[400px]">
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Credits Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="credits"
            nameKey="grade"
            label={({ name, percent }) => 
              window.innerWidth > 640 ? `${name} ${(percent * 100).toFixed(0)}%` : `${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}