import React, { Component } from "react";
import Marks from "./Marks";
export default class Student extends Component {
  constructor() {
    super();
    this.state = {
      roll: 101
    };
  }
  handleClick = () => {
    console.log("Button Clicked");
    this.setState({
      roll: 102
    });
  };
  render() {
    console.log("Student- Component Rendered");
    return (
      <div>
        <Marks roll={this.state.roll} />
        <button onClick={this.handleClick}>Change</button>
      </div>
    );
  }
}
