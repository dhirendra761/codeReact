import React, { Component } from "react";
import Guest from "./Guest";
//Default Value Case
//import { Consumer } from "./Context";
export default class User extends Component {
  render() {
    return (
      <div>
        <h1>User Component</h1>
        <Guest />
      </div>
    );
  }
}

/*
//Default Value Case

render() {
    return <Consumer>{data => <h4>{data}</h4>}</Consumer>;
  }

 */
