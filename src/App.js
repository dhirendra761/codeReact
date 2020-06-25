import React from "react";
import "./styles/App.scss";
import Navbar from "./Components/elements/Navbar";
import Contacts from "./Components/contact/Contacts";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddContact from "./Components/contact/AddContact";
import EditContact from "./Components/contact/EditContact";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <div className="py-3">
              <Switch>
                <Route exact path="/" component={Contacts}></Route>
                <Route
                  exact
                  path="/contacts/add"
                  component={AddContact}
                ></Route>
                <Route
                  exact
                  path="/contacts/edit/:id"
                  component={EditContact}
                ></Route>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
