import React from "react";
import PropTypes from "prop-types";

export default function TopNavigation({ showGameForm }) {
  return (
    <div className="ui secondary pointing menu">
      <a href="/" className="item">
        BGShop
      </a>
      <a className="item" onClick={showGameForm}>
        <i className="icon plus"></i>
        Add New Game
      </a>
    </div>
  );
}

TopNavigation.propTypes = {
  showGameForm: PropTypes.func.isRequired,
};
