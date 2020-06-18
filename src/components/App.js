import React, { Component } from "react";
import { Route } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import HomePage from "./HomePage";
import GamePage from "./GamePage";
import SignupPage from "./SignupPage";
import ShowGamePage from "./ShowGamePage";
import LoginPage from "./LoginPage";
import axios from "axios";

const setAuthorizationHeader = (token = null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
export default class App extends Component {
  state = {
    user: {
      token: null,
    },
    message: "",
  };
  logout = () => {
    this.setState({ user: { taken: null } });
    setAuthorizationHeader();
    localStorage.removeItem("bgShopToken");
  };
  login = (token) => {
    this.setState({ user: { token } });
    localStorage.bgShopToken = token;
    setAuthorizationHeader(token);
  };
  setMessage = (message) => this.setState({ message });
  componentDidMount() {
    if (localStorage.bgShopToken) {
      this.setState({ user: { token: localStorage.bgShopToken } });
      setAuthorizationHeader(localStorage.bgShopToken);
    }
  }
  render() {
    return (
      <div className="ui container">
        <TopNavigation
          isAuthenticated={!!this.state.user.token}
          logout={this.logout}
        />
        {this.setState.message && (
          <div className="ui info message">
            <i className="icon close" onClick={() => this.setMessage("")} />
            {this.state.message}
          </div>
        )}
        <Route path="/" exact component={HomePage} />
        <Route path="/games" component={GamePage} />
        <Route
          path="/signup"
          render={(props) => (
            <SignupPage {...props} setMessage={this.setMessage} />
          )}
        />
        <Route
          path="/login"
          render={(props) => <LoginPage {...props} login={this.login} />}
        />
        <Route path="/game/:_id" exact component={ShowGamePage} />
      </div>
    );
  }
}
