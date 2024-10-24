import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

// Initialize the Solid Gauge module
if (typeof Highcharts === 'object') {
    HighchartsSolidGauge(Highcharts);
}

const CaloriesBurnedGauge = ({ totalCaloriesBurned }) => {
    // Options for the Solid Gauge chart
    const gaugeOptions = {
        chart: {
            type: 'solidgauge',
            backgroundColor: 'transparent',
        },
        title: {
            text: 'Calories Burned This Week',
        },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [
                {
                    backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                    borderWidth: 0,
                    outerRadius: '109%',
                    innerRadius: '70%',
                },
            ],
        },
        yAxis: {
            min: 0,
            max: 5000, // Adjust max based on your needs
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'], // red
            ],
            lineWidth: 0,
            tickInterval: 1000,
            title: {
                text: 'kcal',
            },
        },
        series: [{
            name: 'Calories',
            data: [totalCaloriesBurned],
            tooltip: {
                valueSuffix: ' kcal',
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