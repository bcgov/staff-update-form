import html2canvas from 'html2canvas'
import { jsPDF }    from 'jspdf'

export async function generatePDF() {
  const formElement = document.getElementById('form-to-pdf')
  if (!formElement) {
    console.error('generatePDF error: form element not found')
    return
  }

  const canvas = await html2canvas(formElement, {
    scale: window.devicePixelRatio || 2,
    useCORS: true,
    letterRendering: true,
    onclone: (clonedDoc) => {
      const clonedForm = clonedDoc.getElementById('form-to-pdf')
      if (!clonedForm) return

      // apply your print‑form class if you have other print‑only CSS rules
      clonedForm.classList.add('print-form')

      // Replace each textarea with a div that auto‑wraps & auto‑heights
      clonedForm.querySelectorAll('textarea').forEach((ta) => {
        const style = window.getComputedStyle(ta)
        const replacement = clonedDoc.createElement('div')

        // copy a handful of key styles so it looks the same
        replacement.style.width        = style.width
        replacement.style.minHeight    = 'auto'
        replacement.style.whiteSpace   = 'pre-wrap'
        replacement.style.wordBreak    = 'break-word'
        replacement.style.boxSizing    = 'border-box'
        replacement.style.padding      = style.padding
        replacement.style.font         = style.font
        replacement.style.lineHeight   = style.lineHeight
        replacement.style.border       = style.border
        replacement.style.background   = style.backgroundColor

        // transfer the text, preserving line‑breaks
        replacement.innerHTML = ta.value
                               .replace(/&/g, '&amp;')
                               .replace(/</g, '&lt;')
                               .replace(/>/g, '&gt;')
                               .replace(/\n/g, '<br>')

        ta.parentNode.replaceChild(replacement, ta)
      })
    }
  })

  // now you have a canvas that shows the entire, expanded form
  const imgData = canvas.toDataURL('image/png')
  const pdf     = new jsPDF({
    unit:  'px',
    format: [ canvas.width, canvas.height ]
  })

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
  pdf.save('form.pdf')
}