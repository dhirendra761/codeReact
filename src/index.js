import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import "semantic-ui-css/semantic.min.css";
import "./components/index.css";

//render(<GameCard gamedetails={games[1]} />, document.getElementById("root"));
render(<App />, document.getElementById("root"));
