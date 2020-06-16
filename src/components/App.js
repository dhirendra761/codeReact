import React, { Component } from "react";
import { Route } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import HomePage from "./HomePage";
import GamePage from "./GamePage";
import ShowGamePage from "./ShowGamePage";
export default class App extends Component {
  render() {
    return (
      <div className="ui container">
        <TopNavigation />
        <Route path="/" exact component={HomePage} />
        <Route path="/games" component={GamePage} />
        <Route path="/game/:_id" exact component={ShowGamePage} />
      </div>
    );
  }
}
