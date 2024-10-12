import api from './axiosInstance';

// Login request
const login = (data) => api.post('auth/local?populate=*', data);

// Fetch user details
const me = () => api.get('users/me?populate=*');

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

export {
  login,
  me,
  updateUser,
  WorkoutPlans,
  DietPlans,
  Plans, // Add this export for fetching subplans
  Orders
};