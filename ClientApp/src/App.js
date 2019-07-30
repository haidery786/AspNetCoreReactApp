import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import { FetchEmployee } from "./components/FetchEmployee";
import AddUpdateEmployee from "./components/AddUpdateEmployee";
import Profile from "./components/Profile";
import Auth from "./Auth/Auth";
import Callback from "./Auth/Callback";
import Public from "./components/Public";
import Courses from "./components/Courses";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./components/AuthContext";
import Secure from "./components/Secure";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history)
    };
  }
  static displayName = App.name;

  render() {
    const { auth } = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <Layout auth={auth} props={this.props}>
          <Route
            exact
            path="/"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            exact
            path="/callback"
            render={props => <Callback auth={auth} {...props} />}
          />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/counter" component={Counter} />
          <Route path="/public" component={Public} />
          <PrivateRoute path="/secure" component={Secure} />
          <PrivateRoute path="/courses" component={Courses} />
          <Route path="/fetch-data" component={FetchData} />
          <PrivateRoute path="/fetch-employee" component={FetchEmployee} />
          <Route exact path="/AddUpdate" component={AddUpdateEmployee} />
          <Route path="/AddUpdate/:id" component={AddUpdateEmployee} />
        </Layout>
      </AuthContext.Provider>
    );
  }
}
