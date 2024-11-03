// components/WeightGoalEstimate.js
import React from 'react';

const WeightGoalEstimate = ({ weeksToGoal }) => (
    <div>
        <h3>Estimated Weeks to Reach Your Goal</h3>
        <p>{weeksToGoal ? `${weeksToGoal.toFixed(1)} weeks remaining` : "Calculating..."}</p>
    </div>
);

export default WeightGoalEstimate;