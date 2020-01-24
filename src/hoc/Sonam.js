import React, { Component } from "react";
import Army from "./WithArm";

class Sonam extends Component {
  render() {
    return (
      <div>
        <h2>Camp: {this.props.camp}</h2>
        <h3 onMouseOver={this.props.hochndleGunShots}>
          Sonam {this.props.hocgunName} Gunshots: {this.props.hocGunShots}
        </h3>
      </div>
    );
  }
}
export default Army(Sonam, 10);
