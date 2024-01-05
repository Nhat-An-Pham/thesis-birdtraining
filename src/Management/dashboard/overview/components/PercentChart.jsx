import React from "react";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PercentChart = ({data}) => {
  const options = {
    animationEnabled: true,
    title: {
      text: "Consulting offline vs online",
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "right",
      reversed: true,
      cursor: "pointer",
      fontSize: 20,
      // itemclick: this.toggleDataSeries
    },
    toolTip: {
      reversed: true,
      shared: true,
    },
    axisY: {
      title: "Offline vs online",
      suffix: "%"
    },
    axisX: {
      title: `Month`,
    },
    data: [
      {
        type: "stackedArea100",
        name: "Online",
        showInLegend: true,
        color: "#07bc0c",
        dataPoints: data?.online,
      },
      {
        type: "stackedArea100",
        name: "Offline",
        showInLegend: true,
        color: "#C0C0C0",
        dataPoints: data?.offline,
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart options={options} 
      // onRef={(ref) => (this.chart = ref)} 
      />
    </div>
  );
};

export default PercentChart;
