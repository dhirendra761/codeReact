import React, { Component } from "react";
import Rahul from "./Rahul";
import Sonam from "./Sonam";
export default class App extends Component {
  render() {
    return (
      <div>
        <Rahul camp="110" />
        <Sonam camp="20" />
      </div>
    );
  }
}
