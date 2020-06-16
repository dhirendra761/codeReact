import React from "react";
import PropTypes from "prop-types";

export default function GameDetails({ game }) {
  return (
    <div>
      <h1 className="ui center aligned dividing header">{game.name}</h1>
      <div className="ui stackable grid">
        <div className="six wide column">
          <div className="ui fluid image">
            <img src={game.thumbnail} alt="Game Cover" />
          </div>
        </div>
        <div className="ten wide column">
          <p>{game.description}</p>
          <table className="ui table">
            <tbody>
              <tr>
                <td>Number of Players:</td>
                <td>{game.players}</td>
              </tr>
              <tr>
                <td>Duration:</td>
                <td>{game.duration}</td>
              </tr>
            </tbody>
          </table>
          <p className="ui green huge label">${game.price}</p>
        </div>
      </div>
    </div>
  );
}

GameDetails.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    players: PropTypes.string.isRequired,
  }).isRequired,
};
