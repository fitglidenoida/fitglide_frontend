import React, { useEffect, useState } from 'react';
import { me, updateHealthVital } from '../axios/auth';
import { calculateWeeklyWeightLossGoal } from '../utility/calculateWeightLossGoal';

const UpdateWeightLossGoal = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await me();
                console.log("Response from 'me':", response.data);
                
                if (response && response.data) {
                    const user = response.data;
    
                    // Check if `health_vitals` is present and not empty
                    if (user.health_vitals && user.health_vitals.length > 0) {
                        setUserData(user);
                        console.log("User data with health vitals set successfully:", user);
                    } else {
                        throw new Error("Health vitals are missing or not connected properly.");
                    }
                } else {
                    throw new Error("User data not found.");
                }
            } catch (error) {
                console.error("Failed to fetch user details:", error.message);
                setError("Failed to load user data.");
            }
        };
    
        fetchUserData();
    }, []);

    const handleUpdate = async () => {
        setError(null);
        setSuccess(null);

        if (!userData || !userData.health_vitals || userData.health_vitals.length === 0) {
            setError("Health vitals are missing. Please add health vitals first.");
            return;
        }

        try {
            const weeklyTarget = await calculateWeeklyWeightLossGoal(userData.username);
            const healthVitalData = {
                weight_loss_goal: userData.health_vitals[0]?.weight_loss_goal || 0,
                weeklytarget: weeklyTarget[0],
                username: {
                    connect: [userData.id]
                }
            };

            await updateHealthVital(userData.health_vitals[0].id, healthVitalData);
            setSuccess("Weekly weight loss goal updated successfully.");
        } catch (err) {
            setError("Failed to update weekly weight loss goal.");
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Update Weekly Weight Loss Goal</h1>
            <button onClick={handleUpdate}>Update Goal</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default UpdateWeightLossGoal;