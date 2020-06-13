import React from "react";
import GameList from "./GameList";
import _orderBy from "lodash/orderBy";
import GameFrom from "./GameFrom";
import TopNavigation from "./TopNavigation";

const publishers = [
  { _id: 1, name: "Days of Wonder" },
  { _id: 2, name: "Rio Grande Games" },
];
const games = [
  {
    _id: 1,
    publisher: 1,
    featured: false,
    name: "Quadropolis",
    price: 3299,
    thumbnail:
      "https://cf.geekdo-images.com/BMUcxCZM_AikQ7uXeuDg43RZIWo=/fit-in/246x300/pic2840020.jpg",
    players: "2-4",
    duration: 60,
  },
  {
    _id: 2,
    publisher: 1,
    featured: false,
    name: "Five Tribes",
    price: 5100,
    thumbnail:
      "https://cf.geekdo-images.com/o3D15fBxzTt3k2IFZ2u2Xr7Wlyk=/fit-in/246x300/pic2055255.jpg",
    players: "2-4",
    duration: 80,
  },
  {
    _id: 3,
    publisher: 2,
    featured: false,
    name: "Roll for the Galaxy",
    price: 2999,
    thumbnail:
      "https://cf.geekdo-images.com/Vi3pvbq9sLk_OHzxio8lzjB_77k=/fit-in/246x300/pic1473629.jpg",
    players: "2-5",
    duration: 45,
  },
];

class App extends React.Component {
  state = {
    games: [],
    showGameForm: false,
  };
  componentDidMount() {
    this.setState({
      games: this.sortGames(games),
    });
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
    this.setState({
      games: this.sortGames(
        this.state.games.map((game) =>
          game._id === gameID ? { ...game, featured: !game.featured } : game
        )
      ),
    });
  };
  showGameForm = () => this.setState({ showGameForm: true });
  hideGameForm = () => this.setState({ showGameForm: false });
  addGame = (game) =>
    this.setState({
      games: this.sortGames([
        ...this.state.games,
        {
          ...game,
          _id: this.state.games.length + 1,
        },
      ]),
      showGameForm: false,
    });
  render() {
    const numberOfColumns = this.state.showGameForm ? "ten" : "sixteen";
    return (
      <div className="ui container">
        <TopNavigation showGameForm={this.showGameForm} />

        <div className="ui stackable grid">
          {this.state.showGameForm && (
            <div className="six wide column">
              <GameFrom
                submit={this.addGame}
                cancel={this.hideGameForm}
                publishers={publishers}
              />
            </div>
          )}

          <div className={`${numberOfColumns} wide column`}>
            <GameList
              games={this.state.games}
              toggleFeatured={this.toggleFeatured}
            />
          </div>
        </div>

        <br />
      </div>
    );
  }
}

export default App;
