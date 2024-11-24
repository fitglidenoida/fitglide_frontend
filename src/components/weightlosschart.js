import React, { useState, useEffect } from 'react';
import Highcharts, { color } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import WeightGoalEstimate from './weightgoalestimate';
import { Stats, weightLogs } from '../axios/auth';
import { estimateFutureLoss } from '../utility/weightTrackingUtils';

const WeightTracking = () => {
    const [chartOptions, setChartOptions] = useState({});
    const userDetail = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        const fetchData = async () => {
            const username = userDetail.username; // Replace with actual username
            console.log(userDetail)
            try {
                const healthVitals = await Stats(username);
                const weightLogsData = await weightLogs(username);
                const weightLogsArray = weightLogsData.data;

                if (weightLogsArray.length === 0) {
                    console.warn('No weight logs found for the user.');
                    return;
                }

                // Historical Data
                const historicalData = weightLogsArray.map(log => ({
                    x: new Date(log.logdate).getTime(),
                    y: log.weight
                }));

                // Last Log Date and Weight
                const lastLogDate = new Date(weightLogsArray[0].logdate).getTime();
                const lastWeight = historicalData[0].y;
                const initialWeight = healthVitals.data[0].WeightInKilograms;
                const targetWeight = initialWeight - healthVitals.data[0].weight_loss_goal;

                // Forecast Data - Gradual decline from last recorded weight to target weight
                const calculatedWeeksToGoal = estimateFutureLoss(weightLogsData, initialWeight, targetWeight);

                const forecastData = Array.from({ length: calculatedWeeksToGoal }, (_, i) => ({
                    x: lastLogDate + (i + 1) * 7 * 24 * 60 * 60 * 1000, // Weekly increments
                    y: lastWeight - ((lastWeight - targetWeight) / calculatedWeeksToGoal) * (i + 1)
                }));

                let todayDate = new Date();
                let today = todayDate.getTime() - todayDate.getTimezoneOffset() * 60 * 1000;

                // Configure chart options
                setChartOptions({
                    chart: {
                        backgroundColor: '#f9ac54', // Change background color
                        borderRadius: 10, // Rounded borders
                    },
                    title: {
                        text: 'Weight Tracking',
                        align: 'center',
                        style: {
                            color: '#ffffff'
                        }
                    },
                    xAxis: {
                        type: 'datetime',
                        tickInterval: 7 * 24 * 60 * 60 * 1000, // Weekly intervals
                        title: { text: '' },
                        plotLines: [{
                            color: '#1f2125',
                            width: 2,
                            value: today,
                            zIndex: 2,
                            dashStyle: 'Dash',
                            label: {
                                text: 'Current Date',
                                rotation: 0,
                                y: 20,
                                style: {
                                    color: '#ffffff'
                                }
                            }
                        }],
                        gridLineWidth: 0 // Hide grid lines on x-axis
                    },
                    yAxis: {
                        title: { text: '' },
                        gridLineWidth: 0 // Hide grid lines on y-axis
                    },
                    legend: {
                        enabled: false // Disable series labels
                    },
                    series: [
                        {
                            name: 'Weight Progress',
                            data: historicalData,
                            lineWidth: 4,
                            color: '#ffffff',
                            marker: { enabled: false },
                            dashStyle: 'Solid' // Solid line for historical data
                        },
                        {
                            name: 'Forecast',
                            data: [{ x: lastLogDate, y: lastWeight }, ...forecastData],
                            lineWidth: 4,
                            color: '#ffffff',
                            marker: { enabled: false },
                            dashStyle: 'Dash' // Dashed line for forecast
                        }
                    ]
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
};

export default WeightTracking;