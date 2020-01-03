import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export const Cpu = props => {
  const { cpu } = props;
  const [state, setState] = useState({
    idle: "",
    user: "",
    system: "",
    iowait: "",
    steal: ""
  });

  useEffect(() => {
    /**
     * @name InitChart
     * @desc Calls all asynchronous functions in order.
     * @returns null
     */
    const initChart = async chart => {
      const cpuData = await sortCpuData(chart);
      await createChart(cpuData, chart);
    };
    var chart = am4core.create("cpu-chart", am4charts.XYChart);
    initChart(chart);

    // Unmount
    return () => {};
  }, []);

  /**
   * @name sortCpuData
   * @desc Takes cpu state and filters it into separate arrays for metric conversion.
   * @param {null}
   * @returns {object} Sets graph state for each individual metric point.
   */
  const sortCpuData = chart => {
    /**@desc Filters the cpu props array and assigns them to state. */

    let arr = []; // Empty arr

    // Nested for loop
    for (let i = 0; i < cpu.length; i++) {
      for (let i2 = 0; i2 < cpu[i][0].datapoints.length; i2++) {
        // Assign variables
        var date = new Date(cpu[i][0].datapoints[i2][1] * 1000); // Date variable
        var value = cpu[i][0].datapoints[i2][0]; // Data-points variable
        var name = cpu[i][0].target; // The endpoint name variable

        // Recursively push variables to array
        arr.push({ date, value, name });
      }
    }
    // ============================================================
    // Chart configurations
    console.log(arr);
    chart.data = arr;
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.minZoomCount = 5;
    dateAxis.groupData = true;
    dateAxis.groupCount = 500;
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 95;
    valueAxis.title.text = "CPU Idle Percent";

    var series = chart.series.push(new am4charts.LineSeries());
    series.name = "logic-dev-01";
    series.data = arr;
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;

    var bullet = series.bullets.push(new am4charts.Bullet());
    bullet.tooltipText = "{valueY}%";

    // ==================================================================

    // Filter and assign targets.
    const idle = arr.filter(
      val =>
        val.name ===
        "icinga2.logic-dev-01.services.Linux_CPU.check_nrpe.perfdata.idle.value"
    );

    const user = arr.filter(
      val =>
        val.name ===
        "icinga2.logic-dev-01.services.Linux_CPU.check_nrpe.perfdata.user.value"
    );
    const system = arr.filter(
      val =>
        val.name ===
        "icinga2.logic-dev-01.services.Linux_CPU.check_nrpe.perfdata.system.value"
    );
    const iowait = arr.filter(
      val =>
        val.name ===
        "icinga2.logic-dev-01.services.Linux_CPU.check_nrpe.perfdata.iowait.value"
    );
    const steal = arr.filter(
      val =>
        val.name ===
        "icinga2.logic-dev-01.services.Linux_CPU.check_nrpe.perfdata.steal.value"
    );
    // Assign target arrays to object.
    const cpuState = [idle, user, system, iowait, steal];

    return cpuState;
  };

  /**
   * @name CreateChart
   * @desc Creates chart with cpu data values.
   * @param {object} - An object contained the state values.
   * @returns {object} - The newly created chart.
   */
  const createChart = async (values, chart) => {
  

    // var graph_datapoints1 = [];
    // var graph_datapoints2 = [];

    // for (var i = 0, len = graph_datapoints.length; i < len; i++) {
    //   if (graph_datapoints[i]["name"] === "logic-dev-01") {
    //     graph_datapoints1.push({
    //       date: graph_datapoints[i]["date"]
    //     });
    //   }
    // }
 
  };

  return (
    <div className="cpu-component">
      <div className="cpu-chart"></div>
    </div>
  );
};

// for (var i = 0, i_len = cpu.length; i < i_len; i++) {
//   for (var i2 = 0, len = cpu[i][0]["datapoi2nts"].length; i2 < len; i2++) {
//     var date = new Date(cpu[i]["datapoi2nts"][i2][1] * 1000);
//     var value = cpu[i]["datapoi2nts"][i2][0];
//     var name = cpu[i]["target"];
//     // graph_datapoi2nts.push({
//     //   date: date,
//     //   value: value,
//     //   name: name
//     // });
//   }
// }

export default Cpu;
