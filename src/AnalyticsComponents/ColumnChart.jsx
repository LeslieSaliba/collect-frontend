import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = () => {
  const colors = ["#B7312D"];

  const [chartData, setChartData] = useState({
    series: [{
      data: [21, 22, 10, 28, 16, 21, 13, 30, 21, 13, 30, 20]
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
          columnWidth: '90%',
          distributed: false,
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
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default ColumnChart;
