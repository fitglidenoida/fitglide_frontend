import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StravaConnectButton = ({ userId }) => {
  const [isConnected, setIsConnected] = useState(false); // Track if Strava is connected
  const [athleteId, setAthleteId] = useState(null); // Store the athlete ID

  useEffect(() => {
    // Fetch athlete ID associated with the user from the backend
    const fetchAthleteId = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STRAPI_URL}/api/users/${userId}/strava`
        ); // Endpoint to get user-specific athlete ID
        if (response.data.athleteId) {
          console.log(`Athlete ID fetched: ${response.data.athleteId}`);
          setAthleteId(response.data.athleteId);
          setIsConnected(true);
        } else {
          console.log('No athlete ID found for the user.');
          setIsConnected(false);
        }
      } catch (error) {
        console.error('Error fetching athlete ID:', error);
      }
    };

    fetchAthleteId();
  }, [userId]);

  const handleStravaConnect = async () => {
    if (isConnected) {
      // Unbind Strava: remove athlete ID from the backend
      try {
        await axios.delete(
          `${process.env.REACT_APP_STRAPI_URL}/api/users/${userId}/strava`
        ); // Endpoint to delete user-specific athlete ID
        console.log('Strava unbound successfully.');
        setAthleteId(null);
        setIsConnected(false);
      } catch (error) {
        console.error('Error unbinding Strava:', error);
      }
    } else {
      // Redirect to Strava OAuth page
      const clientId = '117285'; // Your Strava Client ID
      const redirectUri = `${process.env.REACT_APP_BASE_URL}/strava/callback`; // Your redirect URI
      const scope = 'read,activity:read_all'; // Strava permissions scope

      const authorizationUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}&state=${userId}`;
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