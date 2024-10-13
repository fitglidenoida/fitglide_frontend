import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axiosInstance from '../axios/axiosInstance';
import '../styles/dashboard.css';
import 'remixicon/fonts/remixicon.css';

import { me } from '../axios/auth';
import Workout from '../components/workout'; 
import Diet from '../components/diet'; 
import MyAccount from '../components/myaccount'; // Import MyAccount component

const baseURL = "http://localhost:1337/";

const UserDashboard = () => {
    const [user, setUser] = useState({ first_name: '', last_name: '', your_image: {} });
    const [activeTab, setActiveTab] = useState('stats'); 
    const [workoutData, setWorkoutData] = useState([]); 
    const [dietData, setDietData] = useState([]); 
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
        } else {
            console.error('User detail is not available or does not contain documentId');
            navigate('/login'); 
        }
    
        axiosInstance.get("/workout-plans")
            .then((response) => {
                setWorkoutData(response.data); 
            })
            .catch(e => console.log("Error fetching workout data", e));
    
        axiosInstance.get("/diet-plans")
            .then((response) => {
                setDietData(response.data); 
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

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
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
                                        onClick={() => handleTabClick('myaccount')} // Image click shows MyAccount section
                                    />
                                ) : (
                                    <img
                                        src={`${baseURL}/uploads/default_avatar.png`}
                                        alt="Default Profile"
                                        className="profile-picture"
                                        onClick={() => handleTabClick('myaccount')} // Image click shows MyAccount section
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

                  {/* Container to hold either stats, workout calendar, or diet */}
                  <div className="content-area">
                    {activeTab === 'stats' && (
                        <div className="performance-overview">
                            <div className="stats-card">
                                <p>Production Volume</p>
                                <h2>10.431</h2>
                            </div>
                            <div className="stats-card">
                                <p>Order Volume</p>
                                <h2>7.061</h2>
                            </div>
                            <div className="stats-card">
                                <p>Sales Revenue</p>
                                <h2>$ 29 m</h2>
                            </div>
                            <div className="stats-card">
                                <p>Total Machines</p>
                                <h2>267</h2>
                            </div>
                            <div className="stats-card">
                                <p>Production Costs</p>
                                <h2>$ 1.137.061</h2>
                            </div>
                            <div className="stats-card">
                                <p>Waste Produced</p>
                                <h2>789.03</h2>
                            </div>
                        </div>
                    )}

                    {activeTab === 'workout' && (
                        <div className="workout-container">
                            <Workout className="workout-content" workoutData={workoutData} formatTime={formatTime} />
                        </div>
                    )}

                    {activeTab === 'diet' && (
                        <div className="diet-container">
                            <Diet className="diet-content" dietData={dietData} formatTime={formatTime} />
                        </div>
                    )}

                    {activeTab === 'myaccount' && (
                        <div className="myaccount-container">
                            <MyAccount /> {/* Render MyAccount component */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;