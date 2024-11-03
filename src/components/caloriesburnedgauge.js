import React, { useEffect, useState } from 'react';
import Highcharts from "highcharts";
import highchartsMore from "highcharts/highcharts-more";
import solidGauge from "highcharts/modules/solid-gauge";
import HighchartsReact from "highcharts-react-official";
import { calculateWeeklyWeightLossGoal } from '../utility/calculateWeightLossGoal'; // Import function

// Initialize the Solid Gauge module
if (typeof Highcharts === 'object') {
    highchartsMore(Highcharts);
    solidGauge(Highcharts);
}

const CaloriesBurnedGauge = ({ userId, weeklyCalories }) => {
    const [maxCalories, setMaxCalories] = useState(null); // Set initial maxCalories to null

    useEffect(() => {
        const fetchMaxCalories = async () => {
            const { weeklyCalorieBurnTarget } = await calculateWeeklyWeightLossGoal();
            setMaxCalories(weeklyCalorieBurnTarget || 5000); // Update max value based on weekly target
        };

        fetchMaxCalories();
    }, []);

    // Wait until maxCalories has been set to render the chart
    if (maxCalories === null) return null;

    // Options for the Solid Gauge chart
    const gaugeOptions = {
        chart: {
            type: 'solidgauge',
            backgroundColor: 'transparent',
        },
        title: {
            text: 'Calories Meter',
            style: {
                fontSize: '18px',
                color: '#FFFFFF', // Set title color to white
            },
        },
        accessibility: {
            enabled: false, // Disable accessibility module warning
        },
        pane: {
            center: ['50%', '50%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#fafafa',
                borderRadius: 5,
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc',
            },
        },
        exporting: {
            enabled: false,
        },
        tooltip: {
            enabled: true,
            style: {
                color: '#FFFFFF',
            },
            formatter: function () {
                return `<span style="color: white;">${this.y} kcal</span>`;
            },
        },
        yAxis: {
            min: 0,
            max: maxCalories, // Set maximum value to weekly calorie burn target
            stops: [
                [0.1, '#f9ac54'], // orange
                [0.5, '#f9ac54'],
                [0.9, '#f9ac54'],
            ],
            tickPositions: [0, maxCalories / 2, maxCalories], // Define specific tick positions
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70,
                style: {
                    color: '#FFFFFF',
                },
            },
            labels: {
                y: 16,
                style: {
                    color: '#FFFFFF',
                },
                formatter: function () {
                    return `${this.value} kcal`; // Explicit kcal label
                },
            },
        },
        plotOptions: {
            solidgauge: {
                borderRadius: 3,
                dataLabels: {
                    y: -60,
                    borderWidth: 0,
                    useHTML: true,
                    style: {
                        color: '#FFFFFF',
                    },
                    format: '<div style="text-align:center">' +
                        '<span style="font-size:25px">{y}</span><br/>' +
                        '<span style="font-size:12px;color: #FFFFFF; opacity:0.4;">kcal</span>' +
                        '</div>',
                },
            },
        },
        series: [{
            name: 'Calories',
            data: [weeklyCalories],
            tooltip: {
                valueSuffix: ' kcal',
                style: {
                    color: '#FFFFFF',
                },
            },
        }],
    };

    return (
        <div className="gauge-chart">
            <HighchartsReact
                highcharts={Highcharts}
                options={gaugeOptions}
            />
        </div>
    );
};

export default CaloriesBurnedGauge;