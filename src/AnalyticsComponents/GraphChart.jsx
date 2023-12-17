import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148,62, 69,62,]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      colors: ['#B6322C'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'straight',
     
      },
   
 
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        labels: {
          style: {
            colors: "#000000",
            fontSize: '15px',
          },
          rotate: -45, 
        }
      }
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default ApexChart;
