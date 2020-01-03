import React, { useState, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export const Cpu = props => {
  const { cpu } = props;
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < cpu.length; i++) {
      for (let i2 = 0; i2 < cpu[i][0].datapoints.length; i2++) {
        var date = new Date(cpu[i][0].datapoints[i2][1] * 1000);
        var value = cpu[1][0].datapoints[i2][0];
        var name = cpu[1][0].target;
        arr.push({ date: date, value: value, name: name });
      }
    }
    console.log(arr);

    // Unmount
    return () => {};
  }, []);
  return (
    <div className="cpu-component">
      <div className="cpu-chart" />
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
