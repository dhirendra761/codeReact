import React, { Component } from "react";
const Army = (Men, shot) => {
  class NewMen extends Component {
    state = {
      gunshots: 0
    };
    handleOver = () => {
      this.setState({ gunshots: this.state.gunshots + shot });
    };
    render() {
      return (
        <Men
          hocGunShots={this.state.gunshots}
          hocgunName="AK47"
          hochndleGunShots={this.handleOver}
          {...this.props}
        />
      );
    }
  }
  return NewMen;
};
export default Army;
