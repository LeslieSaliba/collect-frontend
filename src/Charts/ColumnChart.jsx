import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = () => {
    const colors = [
        "#B7312D",
        "#B7452E",
        "#B75E2F",
        "#B6322C",
        "#EAEAEA",
        "#DDDDDD",
        "#4C4C4C", 
        "#999999"  
      ];

  const [chartData, setChartData] = useState({
    series: [{
      data: [21, 22, 10, 28, 16, 21, 13, 30]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
          'Amber',
          ['Peter', 'Brown'],
          ['Mary', 'Evans'],
          ['David', 'Wilson'],
          ['Lily', 'Roberts'],
        ],
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      }
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default ColumnChart;