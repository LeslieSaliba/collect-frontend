import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = () => {
  const [chartData, setChartData] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      colors:   [
        "#7A161B",
        "#B6322C",
        "#E98489",
        "#F3BEC1",
        "#D9D9D9",
       
      ],
      fill: {
       
          colors:   [
    "#7A161B",
    "#B6322C",
    "#E98489",
    "#F3BEC1",
    "#D9D9D9",
   
  ],
       
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} />
    </div>
  );
};

export default PieChart;
