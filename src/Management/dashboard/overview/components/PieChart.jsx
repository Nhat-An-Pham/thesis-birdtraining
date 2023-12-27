import { tokens } from "./theme";
import { Grid, Typography, useTheme } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { toast } from "react-toastify";
import dashboardService from "../../../../services/dashboard.service";
import ReactDatePicker from "react-datepicker";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({getYearPickerPieChart}) => {
  const renderYearContent = (valueYear) => {
    const tooltipText = `Tooltip for year: ${valueYear}`;
    return <span title={tooltipText}>{valueYear}</span>;
  };

  const [valueYearSelect, setValueYear] = useState(new Date());
  // return <Line options={options} data={data} />

  // fetch api
  const [pieData, setPieData] = useState(null);

  const getDataPieChart = async () => {
    try {
      let params = {
        year: getYearPickerPieChart.getFullYear(),
      };
      const result = await dashboardService.DashboardPieServicesData(params);
      if (result) {
        console.log("result", result.data);
        setPieData(result.data);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getDataPieChart();
  }, [getYearPickerPieChart]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        fullSize: true,
        font: {
          size: 20,
        },
        display: true,
        text: "Revenue based on 4 service(s) above",
      },
      tooltip: {
        footer: {
          font: {
            size: 18,
          },
        },
        callbacks: {
          footer: (ttItem) => {
            let sum = 0;
            let dataArr = ttItem[0].dataset.data;
            dataArr.map((data) => {
              sum += Number(data);
            });

            let percentage = ((ttItem[0].parsed * 100) / sum).toFixed(2) + "%";
            return `Percentage of data: ${percentage}`;
          },
        },
      },
    },
  };

  const data = {
    labels: pieData?.labels,
    datasets: [
      {
        data: pieData?.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Pie data={data} options={options} />
    </>
  );
};

export default PieChart;
