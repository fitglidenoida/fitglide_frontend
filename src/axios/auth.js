import api from './axiosInstance';

// Login request
const login = (data) => api.post('auth/local?populate=*', data);

//register

const register =(data) => api.post('/auth/local/register',data)

// Fetch user details
const me = () => api.get('users/me?populate=*');

//update user
const updateMe = (data) => api.put('users/me',data);

// Update user details
const updateUser = (userId, data) => api.put(`users/${userId}`, data);

// Fetch workout plans
const WorkoutPlans = () => api.get('workout-plans?populate=*');

// Fetch diet plans
const DietPlans = () => api.get('diet-plans?populate=*');

// Fetch subplans (this is the new part)
const Plans = () => api.get('plans?populate=*'); // Assuming the endpoint is 'subplans'

// Fetch order (this is the new part)
const Orders = () => api.get('create-order?populate=*'); // Assuming the endpoint is 'subplans'

// Fetch order (this is the new part)
const Stats = () => api.get('health-vitals?populate=*'); // Assuming the endpoint is 'subplans'

const strava_bind = (athleteId) => api.get(`strava-bindings?athlete_id=${athleteId}`); // Assuming the endpoint is 'strava'


const strava_save = (data) => api.post(`strava-bindings`,{'data':data}); 

const strava_input = (athleteId) => api.get(`strava-inputs?filters[activity_id][$eq]=${athleteId}`); // Assuming the endpoint is 'strava'


const strava_sync = (data) => api.post(`strava-inputs`,{'data':data}); 

const strava_athlete = (athleteId) => api.get(`strava-bindings?athlete_id=${athleteId}`); // Assuming the endpoint is 'strava'

const StravaData = () => api.get('strava-inputs?populate=*');

export {
  login,
  register,
  me,
  updateUser,
  WorkoutPlans,
  DietPlans,
  Plans, // Add this export for fetching subplans
  Orders,
  Stats,
  strava_bind,
  strava_save,
  strava_input,
  strava_sync,
  strava_athlete,
  updateMe,
  StravaData
};