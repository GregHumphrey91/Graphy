import React, { Fragment, useState, useEffect } from "react";

export const Home = props => {
  const [state, setState] = useState(null);
  useEffect(() => {
    const getGraphs = async () => {
      let res = await fetch("api/graph");
      res = await res.json();
      console.log(res);
    };
    getGraphs();
  }, []);

  return (
    <Fragment>
      <h1> </h1>
    </Fragment>
  );
};

export default Home;
