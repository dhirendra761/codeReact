import React, { Component } from "react";
import { Route } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import HomePage from "./HomePage";
import GamePage from "./GamePage";
import SignupPage from "./SignupPage";
import ShowGamePage from "./ShowGamePage";
export default class App extends Component {
  state = {
    user: {
      token: null,
    },
  };
  logout = () => {
    this.setState({ user: { taken: null } });
  };
  render() {
    return (
      <div className="ui container">
        <TopNavigation
          isAuthenticated={!!this.state.user.token}
          logout={this.logout}
        />
        {console.log(!!this.state.user.token)}
        <Route path="/" exact component={HomePage} />
        <Route path="/games" component={GamePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/game/:_id" exact component={ShowGamePage} />
      </div>
    );
  }
}
