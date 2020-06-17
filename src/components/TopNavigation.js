import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export default function TopNavigation({ isAuthenticated, logout }) {
  return (
    <div className="ui secondary pointing menu">
      <NavLink exact to="/" className="item">
        BGShop
      </NavLink>
      <NavLink exact to="/games" className="item">
        Games
      </NavLink>
      <NavLink exact to="/games/new" className="item">
        <i className="icon plus"></i>
        Add New Game
      </NavLink>
      {isAuthenticated ? (
        <div className="right menu">
          <a onClick={logout} className="item">
            Logout
          </a>
        </div>
      ) : (
        <div className="right menu">
          <NavLink to="/signup" className="item">
            Signup
          </NavLink>
          <NavLink to="/Login" className="item">
            Login
          </NavLink>
        </div>
      )}
    </div>
  );
}

TopNavigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};
