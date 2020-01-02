// Packages
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Components
import HostSelector from "./components/HostSelector";
import Home from "./components/Home";

// CSS
import "semantic-ui-css/semantic.min.css";
import "./App.css";

// App.js
const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <HostSelector />
        <Route path="/" component={Home} />
      </div>
    </BrowserRouter>
  );
};

export default App;
