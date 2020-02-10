import React from "react";
import Featured from "./Featured";
import PropTypes from "prop-types";

const GameCard = ({ game, toggleFeatured }) => (
  <div className="ui card">
    <div className="image">
      <span className="ui green ribbon label">
        ${game.price / 100} {game.price / 100 < 30 && "!"}
      </span>
      <Featured
        featured={game.featured}
        toggleFeatured={toggleFeatured}
        gameId={game._id}
      />
      <img src={game.thumbnail} alt="Game Cover" />
    </div>
    <div className="content">
      <a className="header">{game.name}</a>
      <div className="meta">
        <i className="icon user" />
        {game.players}&nbsp;
        <i className="icon wait" />
        {game.duration} min.
      </div>
    </div>
  </div>
);

GameCard.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    players: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired
  }).isRequired
};

export default GameCard;
