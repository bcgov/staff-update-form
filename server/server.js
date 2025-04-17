// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '20mb' })); // allow big PDF payloads

// configure your SMTP transporter via env vars
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/send-pdf', async (req, res) => {
  try {
    const { pdfData, email } = req.body;
    // pdfData is a data URI: "data:image/png;base64,XXXX..."
    const base64 = pdfData.split(',')[1];
    const buffer = Buffer.from(base64, 'base64');

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,    // e.g. '"Staff‐PDF" <no-reply@yourdomain.ca>'
      to: email,                       // recipient from client
      subject: 'Your Staff Update PDF',
      text: 'Please find attached your PDF.',
      attachments: [
        {
          filename: 'staff-update.pdf',
          content: buffer,
        }
      ]
    });

    res.json({ success: true });
  } catch (err) {
    console.error('send-pdf error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Email server listening on http://localhost:${PORT}`);
});
