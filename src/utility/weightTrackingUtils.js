// utils/weightTrackingUtils.js

export const calculateWeeklyProgress = (weightLogsData, currentWeight) => {
    const weeklyProgress = [];
    console.log(weightLogsData, currentWeight, 'datalog')
    let previousWeight = currentWeight;

    weightLogsData.data.forEach((log, index) => {
        const currentWeight = log.weight;
        console.log(currentWeight,'')
        const weightLoss = previousWeight - currentWeight ;
        const weekStart = new Date(log.logdate).toLocaleDateString();

       // if (index > 0) {
            weeklyProgress.push({ weekStart, weightLoss });
        //}
        previousWeight = currentWeight;
    });

    return weeklyProgress;
};

export const estimateFutureLoss = (weightLogsData, currentWeight, weightLossGoal) => {
    if (weightLogsData.data.length < 2) {
        console.warn("Not enough weight log data to calculate progress.");
        return null;
    }

    // Calculate weight lost so far
    const initialWeight = currentWeight;
    const latestWeight = weightLogsData.data[0].weight;
    const weightLostSoFar = initialWeight - latestWeight;

    // Remaining target weight loss
    const remainingTargetLoss = latestWeight - weightLossGoal;

    // Calculate total weeks recorded and average weekly loss
    const weeksRecorded = weightLogsData.data.length - 1;  // Using index count between logs
    const averageWeeklyLoss = weightLostSoFar / weeksRecorded;

    // Calculate weeks needed to achieve remaining target weight loss
    const weeksToGoal = remainingTargetLoss / averageWeeklyLoss;

    return Math.ceil(weeksToGoal);
};