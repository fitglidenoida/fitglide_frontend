import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateUser } from '../axios/auth'; // Remove unused imports
import { fetchStravaActivities } from '../components/stravasync'; // Import activity sync function

const StravaCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      console.log('Authorization code:', code);
  
      if (code) {
        try {
         const response = await axios.post('https://www.strava.com/oauth/token', {
            client_id: '117285',
             client_secret: '43bc2b20ab1c0baa17e4f0b5d438576102280379',
             code: code,
             grant_type: 'authorization_code',
         });
          //const response = await axios.post('https://www.strava.com/oauth/token', {
            //client_id: '138123',
            //client_secret: 'bf86a326b571873a383d79bdb707dad0922a51b8',
            //code: code,
            //grant_type: 'authorization_code',
          //});
  
          const { access_token, athlete } = response.data;
          console.log('Access token:', access_token);
          console.log('Athlete data:', athlete);
  
          localStorage.setItem('strava_access_token', access_token);
          localStorage.setItem('strava_athlete_id', athlete.id);
  
          const user = JSON.parse(localStorage.getItem("user"));
          user.athlete_id = athlete.id;
          user.image = athlete.profile;
  
          // Update the user in the backend
          await updateUser(user.id, user);
          console.log('User updated with athlete_id:', user.athlete_id);
  
          // Fetch Strava activities
          await fetchStravaActivities(access_token);
  
          // Redirect to the dashboard
          navigate('/dashboard');
        } catch (error) {
          console.error('Error:', error.response?.data || error.message);
        }
      } else {
        console.error('Authorization code not found in URL.');
      }
    };
  
    fetchAccessToken();
  }, [navigate]);
  return (
    <div>
      <h3>Connecting to Strava...</h3>
      <p>Please wait while we authenticate your Strava account.</p>
    </div>
  );
};

export default StravaCallback;