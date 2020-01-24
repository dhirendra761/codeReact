import React, { Component } from "react";

export default class Marks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mroll: this.props.roll
    };
  }
  static getDerivedStateFromProps(props, state) {
    console.log("MARKS--GET DERIVEDSTATE FROM PROPS");
    console.log(props, state);
    if (props.roll !== state.mroll) {
      return { mroll: props.roll };
    }
    return null;
  }
  render() {
    console.log("Marks- Component Rendered");
    return (
      <div>
        <h1>
          {" "}
          {this.props.roll}----
          {this.state.mroll}
        </h1>
      </div>
    );
  }
}
