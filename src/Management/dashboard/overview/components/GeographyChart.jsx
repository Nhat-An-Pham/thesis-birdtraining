import React, { Component } from "react";
// @ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GeographyChart = ({valueGet}) => {
  console.log('data', valueGet?.map(val => val.name))
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Hard-working trainer",
      fontFamily: "verdana",
    },
    axisY: {
      title: "Trainer(s)",
      includeZero: true,
    },
    toolTip: {
      shared: true,
      reversed: true,
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "right",
      reversed: true,
      cursor: "pointer",
    },
    data: valueGet
  };
  return (
    <CanvasJSChart options={options}  />
  );
};

export default GeographyChart;
