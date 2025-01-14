import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
  // Original data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Traffic',
        data: [400, 500, 600, 700, 800, 900, 1000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Revenue',
        data: [300, 600, 400, 700, 500, 900, 1000],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'New Users',
        data: [200, 400, 300, 500, 400, 700, 800],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
      {
        label: 'Subscribers',
        data: [100, 300, 200, 400, 300, 500, 600],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
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

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Analytics</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Chart Section */}
        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-2">Traffic Overview</h3>
          <div className="bg-gray-100 flex items-center justify-center">
            <Line data={data} options={options} />
          </div>
        </div>

        {/* Dataset Selector */}
        <div className="col-span-2 lg:col-span-1 space-y-4">
          {chartData.datasets.map((dataset, index) => (
            <button
              key={index}
              onClick={() => handleDatasetClick(index)}
              className={`bg-gray-50 p-4 rounded shadow text-left w-full ${
                selectedDataset === index ? 'bg-blue-100' : ''
              }`}
            >
              <h4 className="text-[16px] font-medium">{dataset.label}</h4>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;


// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Analytics = () => {
//   // Data for the chart
//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//     datasets: [
//       {
//         label: 'Traffic',
//         data: [400, 500, 600, 700, 800, 900, 1000],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//       },
//       {
//         label: 'Revnue',
//         data: [300, 600, 400, 700,500, 900, 1000],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//       },
//       {
//         label: 'New Users',
//         data: [300, 600, 400, 700,500, 900, 1000],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//       },
//       {
//         label: 'Subscribe',
//         data: [300, 600, 400, 700,500, 900, 1000],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     responsive: true,
//     plugins: {
//       title: {
//         display: true,
//         text: 'Traffic Overview',
//       },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="p-4 bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Analytics</h2>
//       <div className="grid grid-cols-2 gap-4">
//         {/* Chart Section */}
//         <div className="col-span-2 lg:col-span-1">
//           <h3 className="text-lg font-semibold mb-2">Traffic Overview</h3>
//           <div className="bg-gray-100 flex items-center justify-center">
//             <Line data={data} options={options} />
//           </div>
//         </div>

//         {/* Metrics Section */}
//         <div className="col-span-2 lg:col-span-1 space-y-4">
//           <div className="bg-gray-50 p-4 rounded shadow">
//             <h4 className="text-md font-medium">Total Visits</h4>
//             <p className="text-2xl font-bold">124,567</p>
//           </div>
//           <div className="bg-gray-50 p-4 rounded shadow">
//             <h4 className="text-md font-medium">Conversion Rate</h4>
//             <p className="text-2xl font-bold">4.23%</p>
//           </div>
//           <div className="bg-gray-50 p-4 rounded shadow">
//             <h4 className="text-md font-medium">Bounce Rate</h4>
//             <p className="text-2xl font-bold">35.67%</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;
