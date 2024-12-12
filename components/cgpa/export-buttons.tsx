"use client";

import { FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Subject } from "@/lib/types";
import { utils, writeFile } from "xlsx";
import jsPDF from "jspdf";

interface ExportButtonsProps {
  subjects: Subject[];
  cgpa: string;
}

export function ExportButtons({ subjects, cgpa }: ExportButtonsProps) {
  const exportToExcel = () => {
    const data = subjects.map(subject => ({
      Subject: subject.name,
      Credits: subject.credits,
      Grade: subject.grade || 'Not Graded'
    }));

    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "CGPA Report");
    writeFile(wb, "cgpa-report.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text("CGPA Report", 20, 20);
    
    // Add CGPA
    doc.setFontSize(16);
    doc.text(`Current CGPA: ${cgpa}`, 20, 35);
    
    // Add subjects
    doc.setFontSize(12);
    let y = 50;
    
    subjects.forEach(subject => {
      const text = `${subject.name} - ${subject.credits} credits - Grade: ${subject.grade || 'Not Graded'}`;
      const splitText = doc.splitTextToSize(text, 170);
      doc.text(splitText, 20, y);
      y += 10 * splitText.length;
      
      // Add new page if needed
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });
    
    doc.save("cgpa-report.pdf");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button onClick={exportToExcel} variant="outline" className="w-full sm:w-auto">
        <FileSpreadsheet className="w-4 h-4 mr-2" />
        Export to Excel
      </Button>
      <Button onClick={exportToPDF} variant="outline" className="w-full sm:w-auto">
        <FileText className="w-4 h-4 mr-2" />
        Export to PDF
      </Button>
    </div>
  );
}