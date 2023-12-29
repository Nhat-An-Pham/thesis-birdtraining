import * as React from "react";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function BarChart({
  getData,
}) {
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: getData?.title,
    },
    axisX: {
      title: "Courses",
      reversed: true,
    },
    axisY: {
      title: "Revenue top",
      includeZero: true,
      // labelFormatter: this.addSymbols,
    },
    data: [
      {
        type: "bar",
        dataPoints: getData?.dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />
    </div>
  );
}
