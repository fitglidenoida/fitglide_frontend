import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectStrava = () => {
  const [isBound, setIsBound] = useState(false);
  const athleteId = localStorage.getItem('strava_athlete_id'); // Store athlete ID separately

  useEffect(() => {
    const checkBinding = async () => {
      if (athleteId) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_STRAPI_URL}/api/strava-bindings?filters[athelete_id][$eq]=${athleteId}`);
          if (response.data && response.data.length > 0) {
            setIsBound(true);
          }
        } catch (error) {
          console.error('Error checking binding:', error);
        }
      }
    };

    checkBinding();
  }, [athleteId]);

  const handleConnectStrava = () => {
    const clientId = '117285'; // Your Strava client ID
    const redirectUri = `${process.env.BASE_URL}/strava-callback`; // Your redirect URI
    const scope = 'activity:read_all';
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&approval_prompt=auto`;

    window.location.href = authUrl;
  };

  const handleUnbindStrava = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_STRAPI_URL}/api/strava-bindings?filters[athelete_id][$eq]=${athleteId}`);
      localStorage.removeItem('strava_athlete_id');
      setIsBound(false);
    } catch (error) {
      console.error('Error unbinding Strava:', error);
    }
  };

  return (
    <div>
      {isBound ? (
        <button onClick={handleUnbindStrava}>Unbind Strava</button>
      ) : (
        <button onClick={handleConnectStrava}>Connect Strava</button>
      )}
    </div>
  );
};

export default ConnectStrava;