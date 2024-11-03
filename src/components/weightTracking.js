// utils/WeightTracking.js
import React, { useState, useEffect } from 'react';
import WeightGoalEstimate from './weightgoalestimate';
import { Stats, weightLogs } from '../axios/auth';
import {calculateWeeklyProgress, estimateFutureLoss} from '../utility/weightTrackingUtils';

const WeightTracking = () => {
    const [weeksToGoal, setWeeksToGoal] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const username = 'currentUsername'; // Replace with actual username

            try {
                const healthVitals = await Stats(username);
                const currentWeight = healthVitals.data[0].WeightInKilograms;
                console.log(healthVitals,'currentweight')
                const targetWeight = currentWeight - healthVitals.data[0].weight_loss_goal;

                const weightLogsData = await weightLogs(username);
                const weeklyProgress = calculateWeeklyProgress(weightLogsData, currentWeight);
                console.log(weeklyProgress, 'progress')
                const calculatedWeeksToGoal = estimateFutureLoss(weightLogsData, currentWeight, targetWeight);

                setWeeksToGoal(calculatedWeeksToGoal);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <WeightGoalEstimate weeksToGoal={weeksToGoal} />
        </div>
    );
};

export default WeightTracking;