// Packages
import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

// Memory component
export const Memory = props => {
  // Props
  const { memory } = props;

  // UseEffect hook for mounting
  useEffect(() => {
    /**
     * @name InitChart
     * @desc Calls all asynchronous functions in order.
     * @returns null
     */
    const initChart = async chart => {
      const chartData = await formatData();
      await createChart(chart, chartData);
    };

    var chart = am4core.create("memory-chart", am4charts.PieChart);
    initChart(chart);

    // Unmount
    return () => {};
  }, []);

  /**
   * @name CreateChart
   * @param {object} chart - The chart object.
   *  @param {object} chartData - The newly formated chart data.
   *  @desc Creates chart with memory data values.
   * @returns {null}
   */
  const createChart = (chart, chartData) => {
    // Create chart instance

    // Let's cut a hole in our Pie chart the size of 40% the radius
    chart.innerRadius = am4core.percent(20);

    // Add data
    chart.data = chartData;

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "name";
    pieSeries.slices.template.propertyFields.fill = "color";
  };

  /**
   * @name FormatData
   * @desc Filters the memory props array totals all datapoints and returns the average for each field.
   * @param null
   * @returns {object} - New array containing each metric field in chronological order.
   *
   * */
  const formatData = async () => {
    let arr = []; // Empty arr

    // The length of datapoints array
    let length = memory && memory[0][0].datapoints.length;

    // Active field
    let name = "Active";
    let value =
      memory && memory[0][0].datapoints.reduce((acc, curr) => acc + curr[0], 0);
    value = value / length;

    // Memory Used field
    let name2 = "Memory Used";
    let value2 =
      memory && memory[1][0].datapoints.reduce((acc, curr) => acc + curr[0], 0);
    value2 = value2 / length;

    // // MemCached field
    let name3 = "Memory Cached";
    let value3 =
      memory && memory[2][0].datapoints.reduce((acc, curr) => acc + curr[0], 0);
    value3 = value3 / length;

    //  SwapUsed field
    let name4 = "Swap Used";
    let value4 =
      memory && memory[3][0].datapoints.reduce((acc, curr) => acc + curr[0], 0);
    value4 = value4 / length;

    // SwapCached field
    let name5 = "Swap Cached";
    let value5 =
      memory && memory[4][0].datapoints.reduce((acc, curr) => acc + curr[0], 0);
    value5 = value5 / length;

    // Create new array of objects
    arr.push(
      { name: name, value: value },
      { name: name2, value: value2 },
      { name: name3, value: value3 },
      { name: name4, value: value4 },
      { name: name5, value: value5 }
    );

    return arr;
  };

  return (
    <div className="memory-component">
      <h1>Linux Memory</h1>
      <div className="memory-chart"></div>
    </div>
  );
};

export default Memory;
