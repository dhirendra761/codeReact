import React, { Component } from "react";
import { Route } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import HomePage from "./HomePage";
export default class App extends Component {
  render() {
    return (
      <div class="ui container">
        <TopNavigation />
        <Route path="/" exact component={HomePage} />
      </div>
    );
  }
}
