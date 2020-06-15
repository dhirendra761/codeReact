import React from "react";
import { NavLink } from "react-router-dom";

export default function TopNavigation() {
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
    </div>
  );
}
