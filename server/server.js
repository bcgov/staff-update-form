// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa'; // Add this to fetch the public key dynamically
import { validateFirstname } from './validators.js';

const app = express();
app.use(cors());                         // ← allow all origins (or configure as needed)
app.use(bodyParser.json({ limit: '20mb' }));

let transporter = nodemailer.createTransport({
  host: 'apps.smtp.gov.bc.ca',
  port: 25,
  secure: false, // initiate plain connection
  requireTLS: true, // upgrade connection to TLS with STARTTLS
  tls: { rejectUnauthorized: false }, // accept self-signed certs
  //debug: true, // Enable debug output
  //logger: true, // Enable logger
});

/*
// log nodemailer events
transporter.on('log', (info) => {
  console.log('Nodemailer log:', info);
}); */

// Configure the JWKS client
const client = jwksClient({
  jwksUri: process.env.JWKS_URL || 'https://dev.loginproxy.gov.bc.ca/auth/realms/standard/protocol/openid-connect/certs',
});

// Function to get the signing key
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
    } else {
      const signingKey = key.getPublicKey();
      callback(null, signingKey);
    }
  });
};

// Middleware to validate Keycloak token
const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the header
  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      console.error('Token validation error:', err);
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded; // Attach the decoded token to the request object
    next();
  });
};

app.post('/send-pdf', async (req, res) => {
  try {
    const {
      email,
      pdfBase64,
      firstname,
      lastname,
      employeeID,
      ccMail,
      bccMail,
      date,
      attachments
    } = req.body;

    // minimal validation
    if (!email)                           return res.status(400).json({ error: 'email is required' });
    if (!pdfBase64)                       return res.status(400).json({ error: 'pdfBase64 is required' });
    if (!firstname || !lastname)          return res.status(400).json({ error: 'firstname & lastname are required' });

    // firstname validation
    const firstnameError = validateFirstname(firstname);
    if (firstnameError) {
      return res.status(400).json({ error: firstnameError });
    }

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
    const subject = `${lastname}, ${firstname}, ${employeeID} – SUF ${date}`;

    // send the email
    let info = await transporter.sendMail({
      from:    '"Staff Update Form" <sdsi.opssupport.staffing@gov.bc.ca>',
      to:      email,
      cc:      ccMail,
      bcc:     bccMail,
      subject: subject,
      html:`
        <p>
          Hello, <br><br>
          Thank you for submitting a Staff Update Form. A staffing team member will process your request as soon as possible.<br><br>
          Kind regards,<br>
          Staffing Team
        </p>`,
      attachments: mailAttachments
    });

    console.log('mail queued - message ID: ', info.messageId);
    res.json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('send-pdf error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to log login events from frontend
app.post('/log-login', (req, res) => {
  const { idir_username, datetime } = req.body;
  if (idir_username && datetime) {
    console.log(`login [${datetime}]: ${idir_username}`);
    res.json({ ok: true });
  } else {
    res.status(400).json({ error: 'Missing idir_username or datetime' });
  }
});

// Endpoint to log submission events from frontend
app.post('/log-submit', (req, res) => {
  const { idir_username, datetime } = req.body;
  if (idir_username && datetime) {
    console.log(`submission [${datetime}]: ${idir_username}`);
    res.json({ ok: true });
  } else {
    res.status(400).json({ error: 'Missing idir_username or datetime' });
  }
});

app.listen(3001, () => console.log(`Listening on port 3001`));
