import React from "react";
import GameCard from "./GameCard";
import PropTypes from "prop-types";
const GameList = ({ games, toggleFeatured }) => (
  <div className="ui four cards">
    {games.length === 0 ? (
      <div className="ui icon message">
        <i className="icon info"></i>
        <div className="content">
          <div className="header">There are no games in your store!</div>
          <p>You should add some games.</p>
        </div>
      </div>
    ) : (
      games.map((game) => (
        <GameCard toggleFeatured={toggleFeatured} game={game} key={game._id} />
      ))
    )}
  </div>
);

GameList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GameList.defaultProps = {
  games: [],
};

export default GameList;
