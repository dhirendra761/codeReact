import React from "react";
import GameList from "./GameList";
import _orderBy from "lodash/orderBy";
import _find from "lodash/find";
import GameFrom from "./GameFrom";
import api from "../api";
import { Route } from "react-router-dom";

const publishers = [
  { _id: "1", name: "Days of Wonder" },
  { _id: "2", name: "Rio Grande Games" },
];

class GamePage extends React.Component {
  state = {
    games: [],
    selectedGame: {},
    loading: true,
  };

  //Best to place APIs
  componentDidMount() {
    setTimeout(() => {
      api.games
        .fetchAll()
        .then((games) =>
          this.setState({ games: this.sortGames(games), loading: false })
        );
    }, 2000);
  }
  sortGames(games) {
    return _orderBy(games, ["featured", "name"], ["desc", "asc"]);
  }
  //1st Version of Games

  // toggleFeatured = (gameID) => {
  //   const newGames = this.state.games.map((game) => {
  //     if (game._id === gameID) {
  //       return { ...game, featured: !game.featured };
  //     }
  //     return game;
  //   });

  //   this.setState({ games: this.sortGames(newGames) });
  // };

  //2nd Version of Games

  toggleFeatured = (gameID) => {
    const game = _find(this.state.games, { _id: gameID });
    return this.updateGame({
      ...game,
      featured: !game.featured,
    });
  };

  saveGame = (game) => (game._id ? this.updateGame(game) : this.addGame(game));

  // addGame = (game) =>
  //   this.setState({
  //     games: this.sortGames([
  //       ...this.state.games,
  //       {
  //         ...game,
  //         _id: this.state.games.length + 1,
  //       },
  //     ]),
  //     showGameForm: false,
  //   });

  addGame = (gameData) =>
    api.games.create(gameData).then((game) =>
      this.setState({
        games: this.sortGames([...this.state.games, game]),
        showGameForm: false,
      })
    );
  updateGame = (gameData) =>
    api.games.update(gameData).then((game) =>
      this.setState({
        games: this.sortGames(
          this.state.games.map((item) => (item._id === game._id ? game : item))
        ),
        // this.setState({
        //   games: this.sortGames(
        //     this.state.games.map((item) => (item._id === game._id ? game : item))
        //   ),
        showGameForm: false,
      })
    );
  deleteGame = (game) =>
    // deletethis.setState({
    //   games: this.state.games.filter((item) => item._id !== game._id),
    // });
    api.games.delete(game).then(() =>
      this.setState({
        games: this.state.games.filter((item) => item._id !== game._id),
      })
    );
  selectGameForEditing = (game) =>
    this.setState({ selectedGame: game, showGameForm: true });
  render() {
    const numberOfColumns =
      this.props.location.pathname === "/games" ? "sixteen" : "ten";
    return (
      <div className="ui container">
        <div className="ui stackable grid">
          <Route
            path="/games/new"
            render={() => (
              <div className="six wide column">
                <GameFrom
                  submit={this.saveGame}
                  publishers={publishers}
                  game={{}}
                />
              </div>
            )}
          />

          <div className={`${numberOfColumns} wide column`}>
            {this.state.loading ? (
              <div className="ui icon message">
                <i className="notched circle loading icon" />
                <div className="content">
                  <div className="header">Wait a second!</div>
                  <p>Loading Game Collections!!..</p>
                </div>
              </div>
            ) : (
              <GameList
                games={this.state.games}
                toggleFeatured={this.toggleFeatured}
                editGame={this.selectGameForEditing}
                deleteGame={this.deleteGame}
              />
            )}
          </div>
        </div>

        <br />
      </div>
    );
  }
}

export default GamePage;
