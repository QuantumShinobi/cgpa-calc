'use client';

import { GraduationCap } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import Link from 'next/link';

export function Navbar() {
  return (
    <header className="sticky px-5 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-3">
          <GraduationCap className="h-6 w-6 text-primary" />
          <Link href="/" className="text-lg font-bold">
            CGPA Calculator
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
