// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());                         // ← allow all origins (or configure as needed)
app.use(bodyParser.json({ limit: '20mb' }));

let transporter = nodemailer.createTransport({
  host: 'apps.smtp.gov.bc.ca',
  port: 25,
  secure: false,
});

app.post('/send-pdf', async (req, res) => {
  try {
    const {
      email,
      pdfBase64,
      firstname,
      lastname,
      employeeID,
      ccMail,
      date,
      attachments
    } = req.body;

    // minimal validation
    if (!email)                           return res.status(400).json({ error: 'email is required' });
    if (!pdfBase64)                       return res.status(400).json({ error: 'pdfBase64 is required' });
    if (!firstname || !lastname)          return res.status(400).json({ error: 'firstname & lastname are required' });

    // decode the Base64 PDF
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    // Decode each extra attachment
    const extraAttachments = (attachments || []).map(att => ({
      filename:    att.filename,
      content:     Buffer.from(att.content, 'base64'),
      contentType: att.contentType
    }));

    // Build the array for nodemailer
    const mailAttachments = [
      {
        filename:    'form.pdf',
        content:     pdfBuffer,
        contentType: 'application/pdf'
      },
      ...extraAttachments
    ];

    // build  subject line
    const subject = `${lastname}, ${firstname}, (${employeeID}) – Staff Update Form ${date}`;

    // send the email
    let info = await transporter.sendMail({
      from:    '"Staff Update Form" <sdsi.opssupport.staffing@gov.bc.ca>',
      to:      email,
      cc:      ccMail,
      subject: subject,
      text: `Hello,

Thank you for submitting a Staff Update Form. A staffing team member will process your request as soon as possible.

Kind regards,

Staffing Team`,
      attachments: mailAttachments
    });

    console.log('Queued PDF‑mail as', info.messageId);
    res.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('send‑pdf error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => console.log(`Listening on port 3001`));
