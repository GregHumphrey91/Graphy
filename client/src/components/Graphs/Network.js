// Packages
import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

// Network component
export const Network = props => {
  // De structure props.
  const { network } = props;

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

    // Functions are called here
    var chart = am4core.create("network-chart", am4charts.XYChart);
    initChart(chart);

    // Unmount
    return () => {};
  }, []);

  /**
   * @name CreateChart
   * @desc Creates chart with network data values.
   * @param {object, object} - The chart object and the formated chart data.
   * @returns {null}
   */
  const createChart = (chart, chartData) => {
    // Set chart data
    chart.data = chartData;

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    chart.dateFormatter.dateFormat = "[bold green]MMMM-D-YYYY";
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Network Use";

    /**
     * @name  CreateSeries 
     * @param {String} field - The value field from the charts.data array
     * @param {String} name - The series name.
     * @param {Boolean} hidden - Toggles which chart to show/hide.
     * @param {String} date - The date associated with the value.
     * @returns {Object} - The series object.
     */
    function createSeries(field, name, hidden, date) {
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = date;
      series.name = name;
      series.tooltipText = "[bold black]{valueY}bytes [/]Date: {dateX} ";
      series.strokeWidth = 2;
      series.hidden = hidden !== false;

      var bullet = series.bullets.push(new am4charts.Bullet());
      bullet.tooltipText = "{valueY}bytes";

      return series;
    }

    // Multiple Series for 5 metrics
    createSeries("value", "eth0_txbyt", false, "date");
    createSeries("value2", "eth0_txerrs", true, "date2");
    createSeries("value3", "eth0_rxbyt", true, "date3");
    createSeries("value4", "eth0_rxerrs", true, "date4");

    // Legend & Cursor
    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();

    // Event handler for Legend select
    chart.legend.itemContainers.template.events.on("hit", function(ev) {
      var series = ev.target.dataItem.dataContext;
      setTimeout(function() {
        chart.series.each(function(item) {
          if (item != series) {
            item.hide();
          } else {
            item.show();
          }
        });
      }, 10);
    });
  };

  /**
   * @name FormatData
   * @desc Filters the network props array and re-assigns to new array for am4charts.
   * @param null
   * @returns {object} - New array containing each metric field in chronological order.
   *
   * */
  const formatData = async () => {
    let arr = []; // Empty arr

    // Use for loop to push each field into an array.
    let targetLen = network && network[0][0].datapoints.length;
    for (let i = 0; i < targetLen; i++) {
      // eth0_txbyt field
      var eth0_txbytName = network && network[0][0].target;
      var date = network && new Date(network[0][0].datapoints[i][1] * 1000);
      var value = network && network[0][0].datapoints[i][0];

      // eth0_txerrs field
      var eth0_txerrsName = network && network[1][0].target;
      var date2 = network && new Date(network[1][0].datapoints[i][1] * 1000); // Date
      var value2 = network && network[1][0].datapoints[i][0];

      // eth0_rxbyt field
      var eth0_rxbytName = network && network[2][0].target;
      var date3 = network && new Date(network[2][0].datapoints[i][1] * 1000);
      var value3 = network && network[2][0].datapoints[i][0];

      // eth0_rxerrs field
      var eth0_rxerrsName = network && network[3][0].target;
      var date4 = network && new Date(network[3][0].datapoints[i][1] * 1000);
      var value4 = network && network[3][0].datapoints[i][0];

      // Recursively push fields to array
      arr.push({
        eth0_txbytName,
        date,
        value,
        eth0_txerrsName,
        date2,
        value2,
        eth0_rxbytName,
        date3,
        value3,
        eth0_rxerrsName,
        date4,
        value4
      });
    }

    return arr;
  };

  return (
    <div className="network-component">
      <h1>Linux Network</h1>
      <div className="network-chart"></div>
    </div>
  );
};

export default Network;
