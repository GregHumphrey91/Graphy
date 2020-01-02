// Packages
import React, { Fragment, useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";

// Components
import Spinner from "../Layout/Spinner";
import ErrorPage from "../Layout/Error";
import CPU from "../Graphs/Cpu";
import Memory from "../Graphs/Memory";
import Network from "../Graphs/Network";

export const Home = props => {
  const [state, setState] = useState({ memory: "", network: "", cpu: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { activeItem } = props.state;

  useEffect(() => {
    const getGraphs = async () => {
      try {
        console.log(activeItem);
        let res = await fetch(`api/graph/${activeItem}`);
        res = await res.json();
        console.log(res);
        setState({
          memory: "",
          network: "",
          cpu: ""
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

  const getUserData = async activeItem => {
    try {
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

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
          <Grid.Column className="cpu" width={8}>
            <CPU cpu={state.cpu} />
          </Grid.Column>
          <Grid.Column className="network" width={8}>
            <Network network={state.network} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column className="memory" width={8}>
            {" "}
            <Memory memory={state.memory} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
};

export default Home;
