import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Redirect } from "react-router-dom";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import { FetchEmployee } from "./components/FetchEmployee";
import AddUpdateEmployee from "./components/AddUpdateEmployee";
import Profile from "./components/Profile";
import Auth from "./Auth/Auth";
import Callback from "./Auth/Callback";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  static displayName = App.name;

  render() {
    return (
      <Layout auth={this.auth} props={this.props}>
        <Route
          exact
          path="/"
          render={props => <Home auth={this.auth} {...props} />}
        />
        <Route
          exact
          path="/callback"
          render={props => <Callback auth={this.auth} {...props} />}
        />
        <Route
          exact
          path="/profile"
          render={props =>
            this.auth.isAuthenticated() ? (
              <Profile auth={this.auth} {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route path="/counter" component={Counter} />
        <Route path="/fetch-data" component={FetchData} />
        <Route
          path="/fetch-employee"
          render={props =>
            this.auth.isAuthenticated() ? (
              <FetchEmployee {...props} />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route exact path="/AddUpdate" component={AddUpdateEmployee} />
        <Route path="/AddUpdate/:id" component={AddUpdateEmployee} />
      </Layout>
    );
  }
}
