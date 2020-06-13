import React from "react";
import PropTypes from "prop-types";
import Featured from "./Featured";
const GameCard = ({ game, toggleFeatured }) => (
  <div className="ui card">
    <div className="image">
      <span className="ui green ribbon label">
        {game.price}
        {game.price < 3000 && "!"}
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
        <i className="icon users" />
        {game.players} &nbsp;
        <i className="icon wait" /> {game.duration} min.
      </div>
    </div>
  </div>
);

GameCard.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    players: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
};

export default GameCard;
