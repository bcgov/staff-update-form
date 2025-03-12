// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // to load environment variables from a .env file

const app = express();

// Increase the request body limit to handle larger payloads (like PDFs)
app.use(bodyParser.json({ limit: '10mb' }));

// POST endpoint to receive PDF data and send an email
app.post('/send-pdf', async (req, res) => {
  const { pdfData, email } = req.body;
  
  // Validate the incoming data
  if (!pdfData || !email) {
    return res.status(400).json({ message: 'Missing pdfData or email' });
  }

  // Create a transporter using your email service credentials.
  // This example uses Gmail. Make sure to set EMAIL_USER and EMAIL_PASS in your environment.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // e.g., your.email@gmail.com
      pass: process.env.EMAIL_PASS, // your email password or app password
    },
  });

  // Prepare mail options, including the PDF attachment.
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Form Submission PDF',
    text: 'Please find attached the PDF of your form submission.',
    attachments: [{
      filename: 'form-submission.pdf',
      // Remove the data URI header (everything before "base64,")
      content: pdfData.split('base64,')[1],
      encoding: 'base64',
    }],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email: ', error);
    res.status(500).json({ message: 'Error sending email', error });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
