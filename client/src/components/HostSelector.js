// Packages
import React, { Fragment, useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";

// Host selector component
const HostSelector = () => {
  const [state, setState] = useState({ activeItem: "bio" });

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  const { activeItem } = state;

  return (
    <Fragment>
      <Menu tabular>
        <Menu.Item
          name="bio"
          active={activeItem === "bio"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="photos"
          active={activeItem === "photos"}
          onClick={handleItemClick}
        />
      </Menu>
    </Fragment>
  );
};

export default HostSelector;
