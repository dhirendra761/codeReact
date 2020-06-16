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
    const { game, toggleFeatured, editGame, deleteGame } = this.props;
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
              <a
                className="ui green basic button"
                onClick={() => editGame(game)}
              >
                <i className="ui icon edit"></i>
              </a>
              <a
                className="ui red basic button"
                onClick={this.showConfirmation}
              >
                <i className="ui icon trash"></i>
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
  editGame: PropTypes.func.isRequired,
  toggleFeatured: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired,
};

export default GameCard;
