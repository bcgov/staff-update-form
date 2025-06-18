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
    // Only replace if not the default confidential info message
    if (
      (textarea.name === 'comments' &&
        (textarea.value === 'Please do not include any confidential and/or medical information' ||
         textarea.value === 'Please do not include unnecessary private information in the comments')) ||
      (textarea.name === 'leave_comment' &&
        (textarea.value === 'Please do not include any confidential and/or medical information' ||
         textarea.value === 'Please do not include unnecessary private information in the comments'))
    ) {
      // Hide the textarea for PDF rendering
      textarea.style.display = 'none';
      replacements.push({ textarea, replacement: null });
      return;
    }
    const replacement = document.createElement('pre');
    replacement.textContent = textarea.value;
    replacement.classList.add('pdf-textarea-replacement'); // Add a class for custom styling
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
        if (replacement) {
          replacement.remove();
        }
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