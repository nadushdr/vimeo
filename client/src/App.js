import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const [videoId, setVideoId] = useState('950642144'); // Hardcoded Vimeo video ID

  const generateAccessToken = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generateAccessToken');
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error('Error generating access token:', error);
      // Display error to the user
    }
  };

  return (
    <div>
      <h1>Vimeo API Authentication</h1>
      <button onClick={generateAccessToken}>Generate Access Token</button>
      {accessToken && <p>Access Token: {accessToken}</p>}
      <div>
        {/* Replace '950642144' with the dynamic video ID */}
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          width="640"
          height="360"
          frameBorder="0"
          allowFullScreen
          title="Vimeo Video Player"
        ></iframe>
      </div>
    </div>
  );
};

export default App;
