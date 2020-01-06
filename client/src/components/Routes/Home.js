// Packages
import React, { Fragment, useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

// Components
import Spinner from "../Layout/Spinner";
import ErrorPage from "../Layout/Error";
import CPU from "../Graphs/Cpu";
import Memory from "../Graphs/Memory";
import Network from "../Graphs/Network";

// Home component
export const Home = props => {
  // State
  const [state, setState] = useState({ memory: "", network: "", cpu: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Props
  const { activeItem } = props.state;

  useEffect(() => {
    /**
     *@name GetGraphs 
       @desc Sends request to express server for api data.
       @returns {object} - Contains network, cpu, memory data
     */
    const getGraphs = async () => {
      try {
        let res = await fetch(`api/graph/${activeItem}`);
        res = await res.json();

        setState({
          memory: res.memory,
          network: res.network,
          cpu: res.cpu
        });
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    setLoading(true);
    getGraphs();
  }, [activeItem]);

  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <ErrorPage error={error} />;
  }
  return (
    <Fragment>
      <h1>{activeItem === "logic-dev-01" ? "First User" : "Second User"} </h1>
      <Grid className="graph-container">
        <Grid.Row>
          <Grid.Column className="cpu" width={8} stretched="true">
            <CPU cpu={state.cpu} />
          </Grid.Column>
          <Grid.Column
            className="memory"
            width={6}
            style={{ margin: "100px " }}
          >
            {" "}
            <Memory memory={state.memory} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column className="network" width={8}>
            <Network network={state.network} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default Home;
