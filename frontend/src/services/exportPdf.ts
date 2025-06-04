import { jsPDF } from 'jspdf';

export function exportLatexToPdf(latex: string) {
  const doc = new jsPDF();
  doc.text(`Result:\n${latex}`, 10, 10);
  doc.save('calcx-result.pdf');
} 