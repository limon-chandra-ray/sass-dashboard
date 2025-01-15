import { useEffect, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart2 = ({ countrySale }) => {
    const [backgroundColors, setBackgroundColors] = useState([]);

    const generateRandomColors = (count) => {
        return Array.from({ length: count }, () =>
            `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
        );
    };

    useEffect(() => {
        setBackgroundColors(generateRandomColors(countrySale.length));
    }, [countrySale]);

    const data = {
        labels: countrySale.map((country) => country.geography), 
        datasets: [
            {
                label: 'Country Sale Chart',
                data: countrySale.map((country) => country.totalBoxes),
                backgroundColor: backgroundColors,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow resizing
        plugins: {
            legend:{
                display:false
            },
            title: {
                display: true, // Enable the title
                text: 'Geography Sale Chart', // Your chart title
                font: {
                    size: 16, // Adjust font size
                    weight: 'bold', // Adjust font weight
                },
                padding: {
                    top: 10,
                    bottom: 10,
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const countryName = context.label; // Get the country name
                        const value = context.raw; // Get the corresponding value
                        return `${countryName}: ${value} boxes`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-[250px] h-[250px]">
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DoughnutChart2;
