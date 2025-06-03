import { jsPDF } from 'jspdf';

export async function generatePDF() {
  const formElement = document.getElementById('form-to-pdf');
  if (!formElement) {
    console.error('generatePDF error: form element not found');
    return;
  }

  // Get the form's bounding box to determine its size
  const rect = formElement.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  // Add the print-form class to the form for PDF rendering
  formElement.classList.add('print-form');

  const pdf = new jsPDF({
    unit: 'pt',
    format: [width, height]
  });

  await pdf.html(formElement, {
    callback: function (doc) {
      // doc.save('form.pdf'); // or return doc.output('datauristring');
      formElement.classList.remove('print-form'); // Clean up after rendering
    },
    x: 0,
    y: 0,
    html2canvas: { scale: 1 }
  });

  //pdf.save('form.pdf')
  return pdf.output('datauristring');
}