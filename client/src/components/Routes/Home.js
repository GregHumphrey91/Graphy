import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../Layout/Spinner";
import ErrorPage from "../Layout/Error";
export const Home = props => {
  const [state, setState] = useState({ memory: "", network: "", cpu: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getGraphs = async () => {
      try {
        let res = await fetch("api/graphs");
        res = await res.json();
        console.log(res);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    setLoading(true);
    getGraphs();
  }, []);

  const GridExampleColumns = () => (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Grid.Column>
        <Grid.Column width={8}>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={8}>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Grid.Column>
        <Grid.Column width={8}>
          <Image src="https://react.semantic-ui.com/images/wireframe/paragraph.png" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
  if (loading) {
    return <Spinner />;
  } else if (error) {
    return <ErrorPage error={error} />;
  }
  return (
    <Fragment>
      <h1>Home </h1>
    </Fragment>
  );
};

export default Home;
