import React, { useEffect, useState } from 'react';
import { me, updateMe, subPlans } from '../axios/auth';
import '../styles/settings-module.css';

const Settings = () => {
    const [user, setUser] = useState({
        First_name: '',
        Last_Name: '',
        email: '',
        mobile: '',
        Address_line_1: '',
        Address_line_2: '',
        City: '',
        State: '',
        date_of_birth: '',
        your_image: '',
    });

    const [activeTab, setActiveTab] = useState('general');
    const [formData, setFormData] = useState({ ...user });
    const [plans, setPlans] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch user data and plans on initial load
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await me();
                setUser(userDetails);
                setFormData(userDetails); // Sync initial formData with user data
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        const fetchUserPlans = async () => {
            try {
                const userPlans = await subPlans();
                setPlans(userPlans || 'No plans subscribed');
            } catch (error) {
                console.error('Error fetching user plans:', error);
            }
        };

        fetchUserDetails();
        fetchUserPlans();
    }, []);

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Save updated user details
    const handleSave = async () => {
        try {
            await updateMe(formData);
            setUser(formData);
            setIsEditing(false);
            alert('Profile updated successfully!');
        } catch (error) {
            alert('Error updating profile: ' + error.message);
        }
    };

    return (
        <div className="settings-form-container">
            {/* Tabs */}
            <div className="settings-tabs">
                <button
                    className={`settings-tab ${activeTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveTab('general')}
                >
                    General
                </button>
                <button
                    className={`settings-tab ${activeTab === 'plans' ? 'active' : ''}`}
                    onClick={() => setActiveTab('plans')}
                >
                    Plans
                </button>
            </div>

            {/* Tab Content */}
            <div className="settings-tab-content">
                {/* General Tab */}
                <div className={`tab-panel ${activeTab === 'general' ? 'active' : ''}`}>
                    <div className="settings-form-sections">
                        <div className="settings-left-section">
                            {['First_name', 'Last_Name', 'email', 'mobile'].map((field) => (
                                <div className="settings-input-group" key={field}>
                                    <label htmlFor={field}>{field.replace('_', ' ')}</label>
                                    <input
                                        type="text"
                                        name={field}
                                        value={formData[field] || ''}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="settings-right-section">
                            {['Address_line_1', 'Address_line_2', 'City', 'your_image'].map((field) => (
                                <div className="settings-input-group" key={field}>
                                    <label htmlFor={field}>{field.replace('_', ' ')}</label>
                                    {field === 'your_image' ? (
                                        <input
                                            type="file"
                                            name={field}
                                            onChange={(e) =>
                                                setFormData({ ...formData, your_image: e.target.files[0] })
                                            }
                                            disabled={!isEditing}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            name={field}
                                            value={formData[field] || ''}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Button Section */}
                        <div className="settings-button-container">
                            <button
                                className="settings-submit-button"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                            {isEditing && (
                                <button className="settings-submit-button" onClick={handleSave}>
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Plans Tab */}
                <div className={`tab-panel ${activeTab === 'plans' ? 'active' : ''}`}>
                    <div className="settings-form-sections">
                        <div className="settings-left-section">
                            <h3>Your Subscribed Plans</h3>
                            <div>{plans || 'No Active Plans'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;