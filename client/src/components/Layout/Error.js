import React, { useState, useEffect, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Segment, Header, Icon, Button, Divider } from "semantic-ui-react";

export const Error = props => {
  const [exit, setExit] = useState(false);

  const goBack = e => {
    setExit(true);
  };

  if (exit) {
    return <Redirect to="/" />;
  } else {
    return (
      <Fragment>
        <div className="error-segment">
          <h1>Error</h1>
          <Divider />
          <br />
          <br />
          <h2>{props.error.message}</h2>
          <br />
          <br />
          <Button color="red" size="massive" onClick={goBack}>
            Return
          </Button>
        </div>
      </Fragment>
    );
  }
};

export default Error;
