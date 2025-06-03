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

  // --- Expand all textareas for PDF rendering ---
  const textareas = formElement.querySelectorAll('textarea');
  const replacements = [];
  textareas.forEach(textarea => {
    const replacement = document.createElement('pre');
    replacement.textContent = textarea.value;
    replacement.style.cssText = window.getComputedStyle(textarea).cssText;
    replacement.style.whiteSpace = 'pre-wrap';
    replacement.style.wordBreak = 'break-word';
    replacement.style.minHeight = textarea.offsetHeight + 'px';
    replacement.style.width = textarea.offsetWidth + 'px';
    replacement.style.border = textarea.style.border;
    replacement.style.background = textarea.style.background;
    replacement.style.padding = textarea.style.padding;
    replacement.style.margin = textarea.style.margin;
    replacement.style.font = textarea.style.font;
    replacement.style.overflow = 'visible';
    textarea.style.display = 'none';
    textarea.parentNode.insertBefore(replacement, textarea);
    replacements.push({ textarea, replacement });
  });

  await pdf.html(formElement, {
    callback: function (doc) {
      formElement.classList.remove('print-form'); // Clean up after rendering
      // Restore all textareas after PDF rendering
      replacements.forEach(({ textarea, replacement }) => {
        textarea.style.display = '';
        replacement.remove();
      });
    },
    x: 0,
    y: 0,
    html2canvas: {
      scale: 0.8, // Reduce scale for smaller images
      useCORS: true,
      backgroundColor: null,
      imageTimeout: 0,
    }
  });

  //pdf.save('form.pdf')
  return pdf.output('datauristring');
}