import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const videoId = '950642144'; // Hardcoded Vimeo video ID
  const [showPlayer, setShowPlayer] = useState(false); // Flag to control when to show the player

  const generateAccessToken = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generateAccessToken');
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error('Error generating access token:', error);
      // Display error to the user
    }
  };

  const showVideoPlayer = () => {
    setShowPlayer(true); // Show the player after clicking the button
  };

  return (
    <div>
      <h1>Vimeo API Authentication</h1>
      <button onClick={generateAccessToken}>Generate Access Token</button>
      {accessToken && <p>Access Token: {accessToken}</p>}
      {showPlayer && (
        <div>
          <iframe
            src={`https://player.vimeo.com/video/${videoId}?access_token=${accessToken}`}
            width="640"
            height="360"
            frameBorder="0"
            allowFullScreen
            title="Vimeo Video Player"
          ></iframe>
        </div>
      )}
      {!showPlayer && (
        <div>
          <button onClick={showVideoPlayer}>Play Video</button>
        </div>
      )}
    </div>
  );
};

export default App;
