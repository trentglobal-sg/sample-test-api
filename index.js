const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

// Load .env variables with an absolute path for clarity and reliability
const dotenv = require('dotenv');
const envPath = path.resolve(__dirname, '.env'); // Gets absolute path to .env
dotenv.config({ path: envPath });

// Load your SSL certificate and key from Let's Encrypt using env variables
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8');
const certificate = fs.readFileSync(process.env.CERTIFICATE, 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const PORT = 443; // Standard HTTPS port

// Your normal API routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello from my secure HTTPS API!' });
});

app.get('/data', (req, res) => {
  res.json({ data: [1, 2, 3, 4, 5] });
});

// Create the HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start the server (requires sudo)
httpsServer.listen(PORT, '0.0.0.0', () => {
  // Use the domain from the .env file
  console.log(`✅ HTTPS Server running on https://${process.env.DOMAIN}`);
});