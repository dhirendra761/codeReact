import React, { Component } from "react";

class Student extends Component {
  // handleClick = () => {
  //   console.log("button clicked", this);
  // };
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      id: this.props.id
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("button clicked", this.state.id);
  }

  render() {
    return (
      <div>
        <h1>
          Hello Class..!! {this.props.name} and {this.props.id}---
        </h1>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

export default Student;
