import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [accessToken, setAccessToken] = useState('');

  const generateAccessToken = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generateAccessToken');
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error('Error generating access token:', error);
    }
  };

  return (
    <div>
      <h1>Vimeo API Authentication</h1>
      <button onClick={generateAccessToken}>Generate Access Token</button>
      {accessToken && <p>Access Token: {accessToken}</p>}
    </div>
  );
};

export default App;
