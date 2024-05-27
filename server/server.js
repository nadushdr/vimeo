const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const CLIENT_ID = 'd0b0e573b0b29ec699a57570d15e798788cd519d';
const CLIENT_SECRET = 'icvggPMr25ca8NuvsXh72hqfcZ0lBSN0jSiH7zlh5Z0CsfTl3ABr5NR+9FIYfbuH0oL80MCJcPCEIcAfBHQb+K4t6UoBvc/dhtPsOXESO8bAixsy5IEHNUPiINMNSXEs';
const AUTHORIZATION_URL = 'https://api.vimeo.com/oauth/authorize/client';
const ACCESS_TOKEN_URL = 'https://api.vimeo.com/oauth/access_token';

// Allow requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/generateAccessToken', async (req, res) => {
  try {
    // Base64 encode client ID and client secret
    const base64Credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    // Request access token from Vimeo
    const response = await axios({
      method: 'post',
      url: AUTHORIZATION_URL,
      headers: {
        'Authorization': `basic ${base64Credentials}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.vimeo.*+json;version=3.4'
      },
      data: {
        grant_type: 'client_credentials',
        scope: 'private' // You can specify the scope here
      }
    });

    // Send the access token back to the client
    res.json({ access_token: response.data.access_token });
  } catch (error) {
    console.error('Error generating access token:', error.response.data || error.message);
    res.status(500).json({ error: 'Failed to generate access token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
