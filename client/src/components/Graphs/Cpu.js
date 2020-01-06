// Packages
import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

// Cpu component
export const Cpu = props => {
  // De-structure props
  const { cpu } = props;

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

    // Function calls
    var chart = am4core.create("cpu-chart", am4charts.XYChart);
    initChart(chart);

    // Un mount
    return () => {};
  }, []);

  /**
   * @name CreateChart
   * @desc Creates chart with cpu data values.
   * @param {object, object} - The chart object and the formated chart data.
   * @returns {null}
   */
  const createChart = (chart, chartData) => {
    chart.data = chartData;
    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    chart.dateFormatter.dateFormat = "[bold green]MMMM-D-YYYY";
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "CPU Use";

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
      series.tooltipText = "[bold black]{valueY}% [/]Date: {dateX} ";
      series.strokeWidth = 2;
      series.hidden = hidden !== false;

      var bullet = series.bullets.push(new am4charts.Bullet());
      bullet.tooltipText = "{valueY}%";

      return series;
    }

    // Multiple Series for 5 metrics
    createSeries("value", "Idle", false, "date");
    createSeries("value2", "User", true, "date2");
    createSeries("value3", "System", true, "date3");
    createSeries("value4", "Iowait", true, "date4");
    createSeries("value5", "Steal", true, "date5");

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
   * @desc Filters the cpu props array and re-assigns to new array for am4charts.
   * @param null
   * @returns {object} - New array containing each metric field in chronological order.
   *
   * */
  const formatData = async () => {
    let arr = []; // Empty arr

    // Use for loop to push each field into an array.
    let targetLen = cpu && cpu[0][0].datapoints.length;
    for (let i = 0; i < targetLen; i++) {
      // Idle field
      var idleName = cpu && cpu[0][0].target;
      var date = cpu && new Date(cpu[0][0].datapoints[i][1] * 1000);
      var value = cpu && cpu[0][0].datapoints[i][0];

      // User field
      var userName = cpu && cpu[1][0].target;
      var date2 = cpu && new Date(cpu[1][0].datapoints[i][1] * 1000); // Date
      var value2 = cpu && cpu[1][0].datapoints[i][0];

      // System field
      var systemName = cpu && cpu[2][0].target;
      var date3 = cpu && new Date(cpu[2][0].datapoints[i][1] * 1000);
      var value3 = cpu && cpu[2][0].datapoints[i][0];

      // Iowait field
      var iowaitName = cpu && cpu[3][0].target;
      var date4 = cpu && new Date(cpu[3][0].datapoints[i][1] * 1000);
      var value4 = cpu && cpu[3][0].datapoints[i][0];

      // Steal field
      var stealName = cpu && cpu[4][0].target;
      var date5 = cpu && new Date(cpu[4][0].datapoints[i][1] * 1000);
      var value5 = cpu && cpu[4][0].datapoints[i][0];

      // Recursively push fields to array
      arr.push({
        idleName,
        date,
        value,
        userName,
        date2,
        value2,
        systemName,
        date3,
        value3,
        iowaitName,
        date4,
        value4,
        stealName,
        date5,
        value5
      });
    }

    return arr;
  };

  return (
    <div className="cpu-component">
      <h1>Linux CPU</h1>
      <div className="cpu-chart"></div>
    </div>
  );
};

export default Cpu;
