import React, { Component } from "react";

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Raa",
      id: this.props.id
    };
  }
  //UPDATE STATE
  // setState as Object
  handleClick = () => {
    this.setState({
      name: "Vandy"
    });
  };

  render() {
    return (
      <div>
        <h1>
          Hello Class..!! {this.state.name} and {this.state.id}---
          {this.state.nayanaam}
        </h1>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

export default Student;
