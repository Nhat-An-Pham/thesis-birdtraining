import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import ReactDatePicker from "react-datepicker";
import { Grid, Typography } from "@mui/material";
import dashboardService from "../../../../services/dashboard.service";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ getYearPickerLineChart }) {
  // const renderYearContent = (valueYear) => {
  //   const tooltipText = `Tooltip for year: ${valueYear}`;
  //   return <span title={tooltipText}>{valueYear}</span>;
  // };

  // const [valueYearSelect, setValueYear] = useState(new Date());
  // return <Line options={options} data={data} />

  // fetch api
  const [dataFetchYear, setDataFetchYear] = useState([]);

  const getDataDashBoard = async () => {
    try {
      let params = {
        year: getYearPickerLineChart.getFullYear(),
      };
      const result = await dashboardService.DashboardRevenueInYearData(params);
      if (result) {
        setDataFetchYear(result.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDataDashBoard();
  }, [getYearPickerLineChart]);

  const getDataSetOnlineCourse = dataFetchYear.filter(
    (val) => val.label === "Online Course"
  );

  const getDataSetAdviceConsultant = dataFetchYear.filter(
    (val) => val.label === "Advice Consultant"
  );

  const getDataSetWorkshop = dataFetchYear.filter(
    (val) => val.label === "Workshop"
  );

  const getDataSetTrainingCourse = dataFetchYear.filter(
    (val) => val.label === "Training Course"
  );

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
        text: "Revenue based on year",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    labels,
    datasets: [
      {
        id: getDataSetOnlineCourse.map((res) => res.id),
        label: getDataSetOnlineCourse.map((res) => res.label),
        data: getDataSetOnlineCourse.map((val) => val.data).flat(),
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        id: getDataSetAdviceConsultant.map((val) => val.id),
        label: getDataSetAdviceConsultant.map((val) => val.label),
        data: getDataSetAdviceConsultant.map((val) => val.data).flat(),
        borderColor: "rgb(53, 162, 235)",
        borderWidth: 2,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        id: getDataSetWorkshop.map((val) => val.id),
        label: getDataSetWorkshop.map((val) => val.label),
        data: getDataSetWorkshop.map((val) => val.data).flat(),
        borderColor: "rgb(53, 235, 65)",
        borderWidth: 2,
        backgroundColor: "rgba(53, 235, 65, 0.5)",
      },
      {
        id: getDataSetTrainingCourse.map((val) => val.id),
        label: getDataSetTrainingCourse.map((val) => val.label),
        data: getDataSetTrainingCourse.map((val) => val.data).flat(),
        borderColor: "rgb(235, 232, 53)",
        backgroundColor: "rgba(235, 232, 53, 0.5)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      {/* <Grid
        item
        xs={3}
        sx={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontWeight: 600,
            fontSize: "1.2rem",
            marginRight: 10,
          }}
        >
          Select year:
        </Typography>
        <ReactDatePicker
          selected={valueYearSelect}
          renderYearContent={renderYearContent}
          showYearPicker
          dateFormat="yyyy"
          onChange={(value) => {
            setValueYear(value);
            getDataDashBoard(value.getFullYear());
          }}
        />
      </Grid> */}
      <Line options={options} data={data} />
    </>
  );
}
