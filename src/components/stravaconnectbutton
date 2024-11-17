import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StravaConnectButton = () => {
  const [isConnected, setIsConnected] = useState(false); // Track if Strava is connected

  // Check local storage for athlete ID to determine connection status
  useEffect(() => {
    const athleteId = localStorage.getItem('strava_athlete_id');
    if (athleteId) {
      console.log(`Athlete ID found in local storage: ${athleteId}`);
      setIsConnected(true); // Strava is already connected
    } else {
      console.log('No Athlete ID found in local storage. Strava is not connected.');
      setIsConnected(false); // Strava is not connected
    }
  }, []);

  const handleStravaConnect = async () => {
    if (isConnected) {
      // Unbind Strava connection: remove athlete ID from local storage
      const athleteId = localStorage.getItem('strava_athlete_id');
      if (athleteId) {
        try {
          await axios.delete(`${process.env.REACT_APP_STRAPI_URL}/api/strava-bindings/${athleteId}`); // Adjust API endpoint for deletion
          console.log('Strava unbound successfully. Athlete ID removed from database.');
        } catch (error) {
          console.error('Error unbinding Strava:', error);
        }
      }
      localStorage.removeItem('strava_athlete_id');
      setIsConnected(false); // Update state to reflect unbound
    } else {
      // Connect Strava: check if user already exists in the database
      const clientId = '117285'; // Your Strava Client ID
      const redirectUri = `${process.env.REACT_APP_BASE_URL}/callback`; // Your redirect URI
      const scope = 'read,activity:read_all'; // Strava permissions scope

      // Redirect to Strava OAuth page
      const authorizationUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;
      console.log('Redirecting to Strava OAuth authorization...');
      window.location.href = authorizationUrl;
    }
  };

  return (
    <div className="sidebar">
      <button onClick={handleStravaConnect}>
        {isConnected ? 'Unbind Strava' : 'Connect Strava'}
      </button>
    </div>
  );
};

export default StravaConnectButton;