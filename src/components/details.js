// components/Details.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axios/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/details.css';

const Details = () => {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        // Add any other fields you want to include
    });

    const navigate = useNavigate();

    useEffect(() => {
        const userDetail = JSON.parse(localStorage.getItem("user"));
        if (userDetail && userDetail.documentId) {
            axiosInstance.get(`/users/${userDetail.documentId}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    // Handle error appropriately, e.g., redirect to login
                });
        } else {
            navigate('/login'); // Redirect to login if user detail is invalid
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update user data on backend
        axiosInstance.put(`/users/${userData.id}`, userData)
            .then(response => {
                console.log("User updated successfully:", response.data);
                // Optionally show a success message or redirect
            })
            .catch(error => {
                console.error("Error updating user data:", error);
                // Handle error appropriately
            });
    };

    return (
        <div className="user-profile">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={userData.first_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={userData.last_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Add more fields as necessary */}
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Details;