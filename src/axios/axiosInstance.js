import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: process.env.REACT_APP_STRAPI_URL+"/api/",
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {        
        const token = localStorage.getItem('jwt');
        // Check if token exists and is not expired
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

            // Check if token is expired
            if (decodedToken.exp < currentTime) {
                console.warn('Token has expired.'); // You may want to handle this case
                // Optionally redirect to login or refresh token logic can be placed here
                return Promise.reject(new Error('Token has expired. Please log in again.'));
            }

            config.headers.Authorization = `Bearer ${token}`;  
        }
        
        return config;
    },
    (error) => {        
        return Promise.reject(error);
    },
);

// Response interceptor
api.interceptors.response.use(
    (response) => {        
        return response.data;
    },
    (error) => {        
        const generic_error = 'Something went wrong.';
        if (error.response && error.response.data) {
            if (typeof error.response.data === 'string') {
                const newData = {
                    error: generic_error,
                    info: error.response.data,
                };
                return Promise.reject(newData);
            }
            return Promise.reject(error.response);
        }        
        return Promise.reject(error.message);
    },
);

export default api;