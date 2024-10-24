import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from '../axios/axiosInstance';
import '../styles/dashboard.css';
import 'remixicon/fonts/remixicon.css';

import { me, Stats, StravaData } from '../axios/auth';  // Added StravaData to fetch strava-input data
import Workout from '../components/workout'; 
import Diet from '../components/diet'; 
import MyAccount from '../components/myaccount'; 

const baseURL = "http://localhost:1337/";

const UserDashboard = () => {
    const [user, setUser] = useState({ first_name: '', last_name: '', your_image: {} });
    const [activeTab, setActiveTab] = useState('stats'); 
    const [workoutData, setWorkoutData] = useState([]); 
    const [dietData, setDietData] = useState([]); 
    const [healthVitals, setHealthVitals] = useState({}); 
    const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0); 
    const [totalCaloriesConsumed, setTotalCaloriesConsumed] = useState(0); 
    const [weeklyCalories, setWeeklyCalories] = useState(0);  // For weekly burned calories
    const userDetail = localStorage.getItem("user");
    const navigate = useNavigate(); 
   
    useEffect(() => {
        const userdetail = JSON.parse(userDetail);
        
        if (userdetail && userdetail.documentId) {
            me(userdetail.documentId)
                .then(data => {
                    setUser({
                        first_name: data.First_name,
                        last_name: data.Last_name,
                        your_image: data.your_image,
                    });
                })
                .catch(e => console.log(e.message));

            Stats(userdetail.documentId)
                .then(response => {
                    if (response && response.data && response.data.length > 0) {
                        const vitals = response.data[0];
                        setHealthVitals(vitals); 
                    }
                })
                .catch(e => console.log("Error fetching health vitals", e));
        } else {
            console.error('User detail is not available or does not contain documentId');
            navigate('/user'); 
        }

        // Fetch calories burned from Strava input for the current week
        StravaData()
            .then(response => {
                const stravaData = response.data;
                
                if (stravaData && stravaData.length > 0) {
                    const currentWeekData = stravaData.filter(entry => {
                        const entryDate = new Date(entry.start_date_local);
                        const currentDate = new Date();
                        const currentWeekStart = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
                        
                        return entryDate >= currentWeekStart;
                    });
                    
                    const totalWeekCalories = currentWeekData.reduce((total, entry) => total + (entry.calories || 0), 0);
                    const averageWeekCalories = totalWeekCalories / (currentWeekData.length || 1); 
                    setWeeklyCalories(averageWeekCalories); // Set weekly average calories burned
                } else {
                    console.log("No Strava data available for the week");
                }
            })
            .catch(e => console.log("Error fetching Strava input data", e));

        // Fetch diet plan and calculate total calories consumed
        axiosInstance.get("/diet-plans")
            .then((response) => {
                const dietPlans = response.data;
                setDietData(dietPlans);

                // Loop through each diet plan and fetch its associated diet components
                const fetchDietComponents = dietPlans.map(plan => 
                    axiosInstance.get(`/diet-components?diet_plan=${plan.id}`)
                );

                Promise.all(fetchDietComponents)
                    .then(results => {
                        const totalCalories = results.reduce((total, res) => {
                            return total + res.data.reduce((sum, component) => sum + (component.calories || 0), 0);
                        }, 0);
                        setTotalCaloriesConsumed(totalCalories);
                    })
                    .catch(e => console.log("Error fetching diet components", e));
            })
            .catch(e => console.log("Error fetching diet data", e));
    }, [navigate, userDetail]);

    const handleTabClick = (tab) => {
        setActiveTab(tab); 
    };

    const handleSignout = () => {
        localStorage.removeItem("user"); 
        localStorage.removeItem("jwt"); 
        navigate('/user'); 
    };

    const handleConnectStrava = () => {
        const clientId = 117285; 
        const redirectUri = 'http://localhost:3000/strava/callback'; 
        const scope = 'read,activity:read'; 
        const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
        window.location.href = authUrl;
    };

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="logo"></div>
                <ul className='top-icons'>
                    <li onClick={() => handleTabClick('stats')}>
                        <i className="ri-dashboard-3-line"></i> Stats
                    </li>
                    <li onClick={() => handleTabClick('diet')}>
                        <i className="ri-restaurant-line"></i> Diet
                    </li>
                    <li onClick={() => handleTabClick('workout')}>
                        <i className="ri-open-arm-line"></i> Workout
                    </li>
                    <li onClick={handleConnectStrava}>
                        <i className="ri-link-line"></i> Connect Strava
                    </li>
                </ul>
                <ul className='bottom-icon'>
                    <li onClick={handleSignout}>
                        <i className="ri-shut-down-line"></i> Signout
                    </li>
                </ul>
            </div>

            <div className="main-content">
                <div className="header">
                    <div className="user-info">
                        {user && user.first_name ? (
                            <>
                                {user.your_image && user.your_image.url ? (
                                    <img
                                        src={`${baseURL}${user.your_image.url}`}
                                        alt="Profile"
                                        className="profile-picture"
                                        onClick={() => handleTabClick('myaccount')} 
                                    />
                                ) : (
                                    <img
                                        src={`${baseURL}/uploads/default_avatar.png`}
                                        alt="Default Profile"
                                        className="profile-picture"
                                        onClick={() => handleTabClick('myaccount')}
                                    />
                                )}
                                <span>Hello {user.first_name}</span>
                            </>
                        ) : (
                            <span>Loading...</span>
                        )}
                    </div>
                    <input type="text" placeholder="Search" className="search-box" />
                </div>

                <div className="content-area">
                    {activeTab === 'stats' && (
                        <div className="performance-overview">
                            <div className="stats-card">
                                <p>Weight Loss Target</p>
                                <h2>{healthVitals.weight_loss_goal ? healthVitals.weight_loss_goal : "N/A"} KG</h2>
                            </div>
                            <div className="stats-card">
                                <p>Calories Burned This Week</p>
                                <h2>{weeklyCalories.toFixed(2)} kcal</h2> {/* Average weekly calories burned */}
                            </div>
                            <div className="stats-card">
                                <p>Calories Consumed</p>
                                <h2>{totalCaloriesConsumed} kcal</h2>
                            </div>
                        </div>
                    )}

                    {activeTab === 'workout' && (
                        <div className="workout-container">
                            <Workout className="workout-content" workoutData={workoutData} />
                        </div>
                    )}

                    {activeTab === 'diet' && (
                        <div className="diet-container">
                            <Diet className="diet-content" dietData={dietData} />
                        </div>
                    )}

                    {activeTab === 'myaccount' && (
                        <div className="myaccount-container">
                            <MyAccount /> 
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;