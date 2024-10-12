import React, { useEffect, useState } from 'react';
import { me, updateUser } from '../axios/auth';  // Import the API call to fetch user details
import '../styles/myaccount.css';

const MyAccount = () => {
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
    });

    const [formData, setFormData] = useState({
        First_name: '',
        Last_Name: '',
        email: '',
        mobile: '',
        Address_line_1: '',
        Address_line_2: '',
        City: '',
        State: '',
        date_of_birth: '',
        docID: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const response = await me(); // Fetch user data using 'me' function from API

                console.log("API Response:", response);

                if (response && typeof response === 'object') {
                    const dob = response.date_of_birth;

                    setUser({
                        First_name: response.First_name || '',
                        Last_Name: response.Last_Name || '',
                        email: response.email || '',
                        mobile: response.mobile || '',
                        Address_line_1: response.Address_line_1 || '',
                        Address_line_2: response.Address_line_2 || '',
                        City: response.City || '',
                        State: response.State || '',
                        date_of_birth: dob || '',
                        docID: response.id
                    });

                    setFormData({
                        First_name: response.First_name || '',
                        Last_Name: response.Last_Name || '',
                        email: response.email || '',
                        mobile: response.mobile || '',
                        Address_line_1: response.Address_line_1 || '',
                        Address_line_2: response.Address_line_2 || '',
                        City: response.City || '',
                        State: response.State || '',
                        date_of_birth: dob || '',
                        docID: response.id
                    });
                } else {
                    setError("User data not found.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const { date_of_birth, ...dataToSave } = formData;

            const formattedData = {
                ...dataToSave,
                date_of_birth
            };

            const response = await updateUser(user.docID, formattedData);

            console.log('Update Response:', response);

            setUser(formData);  // Update user state with new form data
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            console.error("Error saving user data:", error);
            setError("Failed to save user data. Please try again.");
        }
    };

    if (error) return <div className="error">{error}</div>;
    if (loading) return <div>Loading...</div>;

    return (
        <div className="form-container">
            <div className="form-sections">
                <div className="left-section">
                    <div className="input-group">
                        <label htmlFor="First_name">First Name</label>
                        <input
                            type="text"
                            id="First_name"
                            name="First_name"
                            value={formData.First_name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Last_Name">Last Name</label>
                        <input
                            type="text"
                            id="Last_Name"
                            name="Last_Name"
                            value={formData.Last_Name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="mobile">Contact</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
                <div className="right-section">
                    <div className="input-group">
                        <label htmlFor="Address_line_1">Address</label>
                        <input
                            type="text"
                            id="Address_line_1"
                            name="Address_line_1"
                            value={formData.Address_line_1}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="City">City</label>
                        <input
                            type="text"
                            id="City"
                            name="City"
                            value={formData.City}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="State"
                            name="State"
                            value={formData.State}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="date_of_birth">Date of Birth</label>
                        <input
                            type="date"
                            id="date_of_birth"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </div>
                </div>
            </div>
            {isEditing ? (
                <button className="submit-button" onClick={handleSave}>Update Profile</button>
            ) : (
                <button className="submit-button" onClick={handleEdit}>Edit Profile</button>
            )}
        </div>
    );
};

export default MyAccount;