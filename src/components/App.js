import React from "react";
import _orderBy from "lodash/orderBy";
import GamesList from "./GamesList";

const games = [
  {
    _id: 1,
    featured: false,
    name: "Quadropolis",
    price: 3299,
    thumbnail:
      "https://cf.geekdo-images.com/BMUcxCZM_AikQ7uXeuDg43RZIWo=/fit-in/246x300/pic2840020.jpg",
    players: "2-4",
    duration: 60
  },
  {
    _id: 2,
    featured: true,
    name: "Five Tribes",
    price: 5100,
    thumbnail:
      "https://cf.geekdo-images.com/o3D15fBxzTt3k2IFZ2u2Xr7Wlyk=/fit-in/246x300/pic2055255.jpg",
    players: "2-4",
    duration: 80
  },
  {
    _id: 3,
    featured: false,
    name: "Roll for the Galaxy",
    price: 2999,
    thumbnail:
      "https://cf.geekdo-images.com/Vi3pvbq9sLk_OHzxio8lzjB_77k=/fit-in/246x300/pic1473629.jpg",
    players: "2-5",
    duration: 45
  }
];

//Class Component

class App extends React.Component {
  // Define State
  // Method 1: Using Constructor
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     games: []
  //   };
  // }

  //Method 2: Class property
  state = {
    games: []
  };
  componentDidMount() {
    //this.setState({ games: games });
    // if both are the same then
    this.setState({
      games: _orderBy(games, ["featured", "name"], ["desc", "asc"])
    });
  }
  toggleFeatured = gameId => {
    console.log(this);
    const newGames = this.state.games.map(game => {
      if (game._id === gameId) return { ...game, featured: !game.featured };
      return game;
    });
    this.setState({ games: newGames });
    console.log("hi");
  };
  render() {
    return (
      <div className="ui container">
        <GamesList
          games={this.state.games}
          toggleFeatured={this.toggleFeatured}
        />
      </div>
    );
  }
}

// Function Component
//const App = () => (
//   <div className="ui container">
//     <GamesList games={games} />
//   </div>
// );

export default App;
