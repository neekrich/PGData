import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js"

import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { lineChartData } from "../test_data";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export const LineGraph = () => {
    const options = {};
    
    return <Line options={options} data={ lineChartData } />;
};