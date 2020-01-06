// Packages
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Components
import HostSelector from "./components/Layout/HostSelector";
import Home from "./components/Routes/Home";

// CSS
import "semantic-ui-css/semantic.min.css";
import "./App.css";

// AmCharts package
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

// App.js
const App = props => {
  // State for graph display
  const [state, setState] = useState({ activeItem: "logic-dev-01" });

  return (
    <BrowserRouter>
      <div className="App">
        <HostSelector {...props} state={state} setState={setState} />
        <Route path="/" render={props => <Home {...props} state={state} />} />
      </div>
    </BrowserRouter>
  );
};

export default App;
