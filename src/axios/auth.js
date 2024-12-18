import api from './axiosInstance';

// Login request
const login = (data) => api.post('auth/local?populate=*', data);

// Register
const register = (data) => api.post('/auth/local/register', data);

// Fetch user details
const me = () => api.get('users/me?populate=*');

// Update user
const updateMe = (data) => api.put('users/me', data);

// Update user details
const updateUser = (userId, data) => api.put(`users/${userId}`, data);

// Fetch workout plans
const WorkoutPlans = () => api.get('workout-plans?populate=*');

// Fetch diet plans
const DietPlans = () => api.get('diet-plans?populate=*');

// Fetch subplans
const Plans = () => api.get('plans?populate=*'); // Assuming the endpoint is 'subplans'

// Fetch order
const Orders = () => api.get('create-order?populate=*'); // Assuming the endpoint is 'subplans'

// Fetch health vitals
const Stats = (username) => api.get(`health-vitals?populate=*&filters[username][username][$eq]=${username}`); // Assuming the endpoint is 'health-vitals'

// Fetch strava binding
const strava_bind = (athleteId) => api.get(`strava-bindings?athlete_id=${athleteId}`); // Assuming the endpoint is 'strava'

// Save strava binding
const strava_save = (data) => api.post(`strava-bindings`, { 'data': data }); 

// Fetch strava inputs
const strava_input = (athleteId) => api.get(`strava-inputs?filters[activity_id][$eq]=${athleteId}`); // Assuming the endpoint is 'strava'

// Sync strava inputs
const strava_sync = (data) => api.post(`strava-inputs`, { 'data': data }); 

// Fetch strava athlete binding
const strava_athlete = (athleteId) => api.get(`strava-bindings?athlete_id=${athleteId}`); // Assuming the endpoint is 'strava'

// Fetch strava data
const StravaData = (username) => api.get(`strava-inputs?populate=*&filters[username][username][$eq]=${username}`);

// Update health vitals
const updateHealthVital = ({ documentId, data }) => api.put(`health-vitals/${documentId}`, { data });

// fetch Weightlogs
const weightLogs = (username) => api.get(`weightlogs?filters[username][username][$eq]=${username}&sort=logdate:DESC`); // Assuming the endpoint is 'health-vitals'

// fetch Weightlogs
const updateweightLogs = (logId, data) => api.put(`weightlogs/${logId}`, { data });
const addweightLogs = (data) => api.post(`weightlogs`, { 'data': data });

// fetch subscription Plans
const subPlans = () => api.get(`subscriptions?populate=*&filters[username][username][$eq]=${username}`);

//Updae Subscription plans
const updatePlan = (planId, data) => api.put(`plans/${planId}`, { data });



export {
    login,
    register,
    me,
    updateUser,
    updateHealthVital, 
    WorkoutPlans,
    DietPlans,
    Plans,
    Orders,
    Stats,
    strava_bind,
    strava_save,
    strava_input,
    strava_sync,
    strava_athlete,
    updateMe,
    StravaData,
    weightLogs,
    updateweightLogs,
    subPlans,
    updatePlan,
    addweightLogs
};