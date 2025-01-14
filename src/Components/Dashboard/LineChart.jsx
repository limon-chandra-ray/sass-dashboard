import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const LineChart=({monthlyData,months_list})=>{
    const chartData = {
        labels: months_list.map(month=>`${month.label}`),
        datasets: [
          {
            label: 'Sales',
            data: monthlyData.map(month=> month.sales),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
          {
            label: 'Boxes',
            data: monthlyData.map(month=> month.box),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
          {
            label: 'Costs',
            data: monthlyData.map(month=> month.cost),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
          },
          {
            label: 'Profit',
            data: monthlyData.map(month=> month.profit),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
          }
          
        ],
      };
    
      const [data, setData] = useState(chartData); // State to manage the chart data
      const [selectedDataset, setSelectedDataset] = useState(null); // Track the selected dataset
    
      // Options for the chart
      const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Traffic Overview',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      };
    
      // Function to handle dataset click
      const handleDatasetClick = (datasetIndex) => {
        if (selectedDataset === datasetIndex) {
          // Reset to show all datasets
          setData(chartData);
          setSelectedDataset(null);
        } else {
          // Show only the clicked dataset
          const selectedData = {
            labels: chartData.labels,
            datasets: [chartData.datasets[datasetIndex]],
          };
          setData(selectedData);
          setSelectedDataset(datasetIndex);
        }
      };
    return <>
        <div>
            <div className="flex justify-start gap-2 items-baseline space-y-4 py-2">
            {chartData.datasets.map((dataset, index) => (
                <button
                key={index}
                onClick={() => handleDatasetClick(index)}
                className={`bg-gray-200 p-4 rounded shadow text-left w-full ${
                    selectedDataset === index ? 'bg-green-500 ' : ''
                }`}
                >
                <h4 className="text-[16px] font-medium">{dataset.label}</h4>
                </button>
            ))}
            </div>
            <div className="bg-gray-100 flex items-center justify-center">
                <Line data={data} options={options} />
            </div>
        </div>
    
    </>
}
export default LineChart;