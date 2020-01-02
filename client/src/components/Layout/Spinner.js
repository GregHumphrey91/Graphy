import React, { Fragment } from "react";
import { Loader, Dimmer, Segment } from "semantic-ui-react";
export const Spinner = () => {
  return (
    <Fragment>
      <Dimmer active>
        <Loader size="massive">Please Wait...</Loader>
      </Dimmer>
    </Fragment>
  );
};
export default Spinner;
