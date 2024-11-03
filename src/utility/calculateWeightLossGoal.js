// src/utility/calculateWeightLossGoal.js

import { Stats } from '../axios/auth'; // Import only the Stats function

// Function to calculate weekly weight loss target from monthly goal
export const calculateWeeklyWeightLossGoal = async () => {
    try {
        // Fetch the current user's health vitals using their JWT token
        const response = await Stats();
        const healthVitals = response.data[0]; // Assuming the first entry is the logged-in user's health vitals
        console.log("Fetched health vitals:", healthVitals); // Debugging line

        // Get the weight loss goal directly from health vitals
        const weightLossGoal = healthVitals?.weight_loss_goal || 0;

        const monthlyTarget = weightLossGoal / 5;
        const weeks = getWeeksInMonth();
        const weeklyWeightLossGoal = monthlyTarget / weeks.length;
        const weeklyCalorieBurnTarget = weeklyWeightLossGoal * 7500;

        // Return the calculated values without updating the collection
        return { weeklyWeightLossGoal, weeklyCalorieBurnTarget };
    } catch (error) {
        console.error("Error fetching weight loss goal", error);
        return { weeklyWeightLossGoal: 0, weeklyCalorieBurnTarget: 0 };
    }
};

// Helper function to get weeks in a month
const getWeeksInMonth = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    let weeks = [];
    let startOfWeek = new Date(year, month, 1);

    while (startOfWeek.getMonth() === month) {
        let endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        if (endOfWeek.getMonth() !== month) {
            endOfWeek.setMonth(month + 1);
            endOfWeek.setDate(0);
        }

        weeks.push({ start: new Date(startOfWeek), end: new Date(endOfWeek) });
        startOfWeek.setDate(startOfWeek.getDate() + 7);
    }

    return weeks;
};