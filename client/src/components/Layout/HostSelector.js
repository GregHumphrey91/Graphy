// Packages
import React, { Fragment, useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";

// Host selector component
const HostSelector = props => {
  const { setState } = props;
  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  const { activeItem } = props.state;

  return (
    <Fragment>
      <Menu size="massive" tabular>
        <Menu.Item
          name="logic-dev-01"
          active={activeItem === "logic-dev-01"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="logic-dev-02"
          active={activeItem === "logic-dev-02"}
          onClick={handleItemClick}
        />
      </Menu>
    </Fragment>
  );
};

export default HostSelector;
