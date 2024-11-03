const KCAL_PER_KG = 7500;

// Calculate weekly calorie deficit for a given weight loss goal
export const calculateCalorieDeficit = (weeklyGoal) => {
    const requiredCalories = weeklyGoal * KCAL_PER_KG;
    return {
        requiredCalories,
        flag: requiredCalories > 7500 ? "red" : "normal" // Mark red if weekly calories exceed 7500
    };
};