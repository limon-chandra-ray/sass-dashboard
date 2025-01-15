import { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({productA}) => {
    const data = {
        labels:["Sale","Cost","Profit"],
        datasets: [
            {
                label: 'My First Dataset',
                data: [productA?.sale, productA?.cost, productA?.profit],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend:{
                display:false
            },
            title: {
                display: true, // Enable the title
                text: 'Total Sale Cost Profit', // Your chart title
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
                        return `${context.label}: ${context.raw}`;
                    }
                }
            }
        }
    };

    return (
        <div className='w-[200px] h-[200px]'>
            <Doughnut data={data} options={options} className='w-[250px] h-[250px]'  />
        </div>
    );
};

export default DoughnutChart;
