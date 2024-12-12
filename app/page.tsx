import { CGPACalculator } from '@/components/cgpa/calculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <CGPACalculator />
    </div>
  );
}