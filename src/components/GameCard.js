import React from "react";
import PropTypes from "prop-types";
import Featured from "./Featured";
import { Link } from "react-router-dom";

class GameCard extends React.Component {
  state = {
    showConfirmation: false,
  };
  showConfirmation = () => this.setState({ showConfirmation: true });
  hideConfirmation = () => this.setState({ showConfirmation: false });
  render() {
    const { game, toggleFeatured, deleteGame } = this.props;
    return (
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
          <Link to={`/game/${game._id}`} className="header">
            {game.name}
          </Link>
          <div className="meta">
            <i className="icon users" />
            {game.players} &nbsp;
            <i className="icon wait" /> {game.duration} min.
          </div>
        </div>
        <div className="extra content">
          {this.state.showConfirmation ? (
            <div className="ui two buttons">
              <a
                className="ui red basic button"
                onClick={() => deleteGame(game)}
              >
                <i className="ui icon check" />
                YES
              </a>
              <a
                className="ui grey basic button"
                onClick={this.hideConfirmation}
              >
                <i className="ui icon close" />
                NO
              </a>
            </div>
          ) : (
            <div className="ui two buttons">
              <Link
                className="ui green basic button"
                to={`/games/edit/${game._id}`}
              >
                <i className="ui icon edit" />
              </Link>
              <a className="ui red basic button">
                <i className="ui icon trash" />
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

GameCard.propTypes = {
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    players: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired,
};

export default GameCard;
