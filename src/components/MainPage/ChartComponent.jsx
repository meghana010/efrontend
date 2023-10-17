import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const ChartComponent = ({ data, filters }) => {
  const [barChartData, setBarChartData] = useState({ labels: [], datasets: [] });
  const [pieChartData, setPieChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const filteredData = data.filter((item) => {
      const categoryMatch = filters.selectedCategory === 'All' || item.category === filters.selectedCategory;
      const nameMatch = filters.selectedName === 'All' || item.name === filters.selectedName;
      const genderMatch = filters.selectedGender === 'All' || item.gender === filters.selectedGender;
      return categoryMatch && nameMatch && genderMatch;
    });

    const aggregatedData = aggregateData(filteredData);
    const labels = Object.keys(aggregatedData);
    const values = Object.values(aggregatedData);

    setBarChartData({
      labels: labels,
      datasets: [
        {
          label: 'Total Quantity',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    });

    setPieChartData({
      labels: labels,
      datasets: [
        {
          data: values,
          backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple','pink'],
        },
      ]
    });
  }, [data, filters]);

  const aggregateData = (filteredData) => {
    const aggregatedData = {};

    filteredData.forEach((item) => {
      const key = `${item.category}-${item.name}-${item.gender}`;
      if (!aggregatedData[key]) {
        aggregatedData[key] = 0;
      }
      aggregatedData[key] += item.quantity;
    });

    return aggregatedData;
  };

  const barOptions = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    plugins: {
        legend: {
          position: 'bottom',
        },
      },
    responsive: true,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
        <div style={{ width: '70%' }}>
          <Bar data={barChartData} options={barOptions} />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <hr></hr>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div style={{ width: '33%' }}>
          <Pie data={pieChartData} options={pieOptions} />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
      
    
  );
};

export default ChartComponent;
