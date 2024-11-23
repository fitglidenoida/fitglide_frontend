import dayjs from 'dayjs'; // For date manipulation
import axios from 'axios'; // For HTTP requests
import { me, strava_input, strava_sync } from '../axios/auth'; // Fetch user data using 'me' endpoint

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const MAX_RETRIES = 3;

export const fetchStravaActivities = async (accessToken, retryCount = 0) => {
    const currentTime = dayjs().unix();

    try {
        const userResponse = await me(); // Fetches the current user details
        console.log('User Response:', userResponse); // Log the raw response

        // Check if userResponse is properly formatted
        if (!userResponse || !userResponse.id) {
            console.error('User data is not valid or missing.');
            return;
        }

        // Extract the user data
        const userData = userResponse; // This is now directly the user response
        const athleteId = userData.athlete_id; // Get athlete_id from user

        if (!athleteId) {
            console.error('Athlete ID not found in user data.');
            return;
        }

        console.log('Athlete ID:', athleteId);

        // Step 2: Fetch the first 100 activities for the specific athlete
        const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: {
                before: currentTime,
                per_page: 100 // Fetch up to 100 activities
            }
        });

        const activities = response.data;

        if (!activities || activities.length === 0) {
            console.log('No activities found for the athlete.');
            return;
        }

        console.log(`Fetched ${activities.length} activities from Strava.`);
        
        // Step 3: Process each activity
        for (const activity of activities) {
            console.log(`Processing activity with ID: ${activity.id}`);

            // Fetch detailed activity data for each activity using the correct endpoint
            const detailedActivityResponse = await axios.get(`https://www.strava.com/api/v3/activities/${activity.id}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            const detailedActivity = detailedActivityResponse.data;
            console.log("detailedActivity", detailedActivity);

            // Handle missing coordinates by assigning default values [0, 0]
                const startLatLng = detailedActivity.start_latlng && detailedActivity.start_latlng.length > 0 
                ? detailedActivity.start_latlng 
                : [0, 0];

                const endLatLng = detailedActivity.end_latlng && detailedActivity.end_latlng.length > 0 
                ? detailedActivity.end_latlng 
                : [0, 0];

            // Check if the activity already exists in the strava-input collection by its activity ID
            const result = await strava_input(activity.id);
            if (result.data.length > 0) {
                console.log(`Activity with ID ${activity.id} already exists.`);
            } else {
                const activityData = {
                    activity_id: activity.id,
                    athlete_id: athleteId,  // From user data
                    firstname: userData.First_name,                    
                    lastname: userData.Last_name,
                    strava_username: userData.strava_username,
                    profile: userData.profile,
                    resource_state: detailedActivity.resource_state,
                    profile_medium: userData.profile_medium,
                    name: detailedActivity.name,
                    distance: detailedActivity.distance,
                    moving_time: detailedActivity.moving_time,
                    elapsed_time: detailedActivity.elapsed_time,
                    total_elevation_gain: detailedActivity.total_elevation_gain,
                    sport_type: detailedActivity.type,
                    elev_high: detailedActivity.elev_high,
                    start_date: detailedActivity.start_date,
                    start_date_local: detailedActivity.start_date_local,
                    timezone: detailedActivity.timezone,
                    gear_id: detailedActivity.gear_id,
                    gear: detailedActivity.gear,
                    kilojoules: detailedActivity.kilojoules,
                    max_watts: detailedActivity.max_watts,
                    weighted_average_watts: detailedActivity.weighted_average_watts,
                    calories: detailedActivity.calories,
                    average_speed: detailedActivity.average_speed,
                    max_speed: detailedActivity.max_speed,
                    description: detailedActivity.description,
                    achievement_count: detailedActivity.achievement_count,
                    kudos_count: detailedActivity.kudos_count,
                    upload_id_str: detailedActivity.upload_id_str,
                    photos: detailedActivity.photos,
                    workout_type: detailedActivity.workout_type,
                    device_watts: detailedActivity.device_watts,
                    username: {
                        connect: [userData.documentId]
                    }
                };

                // Write the activity data to the strava-input collection
                await strava_sync(activityData);
                console.log(`Activity with ID ${activity.id} synced successfully.`);
            }
        }

        // After processing all activities, redirect to the dashboard
        window.location.href = '/dashboard';

    } catch (error) {
        console.error('Error fetching or syncing activities from Strava:', error);

        // Handle rate limiting and retry with delay
        if (error.response && error.response.status === 429) {
            const retryAfter = 60 * 1000; // Wait 1 minute before retrying
            console.log('Rate limit exceeded. Retrying after 60 seconds...');
            await delay(retryAfter);

            if (retryCount < MAX_RETRIES) {
                return fetchStravaActivities(accessToken, retryCount + 1); // Retry with incremented retryCount
            } else {
                console.error('Max retries reached, cannot fetch activities.');
            }
        }
    }
};