import { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({productA}) => {
    const data = {
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
        <div className='w-[350px] h-[350px]'>
            <Doughnut data={data} options={options} className='w-[250px] h-[250px]'  />
        </div>
    );
};

export default DoughnutChart;
