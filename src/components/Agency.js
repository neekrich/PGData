import React, { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import axios from 'axios';
import {
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export const AgencyData = () => {
    
    const [chartData, setChartData] = useState({
        datasets: [],

    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://data.princegeorgescountymd.gov/resource/sk5x-gxv7.json?$query=SELECT%20%60payee_name%60%2C%20%60agency%60%2C%20%60amount%60%2C%20%60payment_description%60%0AWHERE%20%60amount%60%20%3E%20%22100.00%22');
                const rawData = response.data;
                
                // Process data: aggregate and prepare for Chart.js
                const aggregatedData = aggregateData(rawData);
                const labels = Object.keys(aggregatedData);
                const values = Object.values(aggregatedData);

                // Set chart data
                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Amount',
                        data: values,
                        backgroundColor: [ 
                        '#B2EF91',
                        '#B7E98F',
                        '#BCE38D',
                        '#C0DD8B',
                        '#C5D689',
                        '#CAD087',
                        '#CFCA85',
                        '#D4C483',
                        '#D8BE80',
                        '#DDB87E',
                        '#E2B27C',
                        '#E7AC7A',
                        '#ECA578',
                        '#F09F76',
                        '#F59974',
                        '#FA9372',
                        ],
                    }],
                });
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, 
    []);

    const options = {
        responsive: true, 
        maintainAspectRatio: false, 
        plugins: {
            legend: {
                position: "top",
            },
            title: {
            display: true,
            text: "Fiscal Spending by Agency/Department",
            },
        scales: {
          y: {
            beginAtZero: true
          },
        },
    },
};


    // Aggregrate Function
    const aggregateData = (data) => {
        return data.reduce((acc, item) => {
            const key = item.agency;
            if (!acc[key]) {
                acc[key] = 0;
            }
            acc[key] += parseFloat(item.amount);
            return acc;
        }, {});
    };

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};
