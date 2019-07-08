import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";
import { FetchEmployee } from "./components/FetchEmployee";
import CreateEmployee from "./components/CreateEmployee";
import EditEmployee from "./components/EditEmployee";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/fetch-data" component={FetchData} />
        <Route path="/fetch-employee" component={FetchEmployee} />
        <Route exact path="/create" component={CreateEmployee} />
        <Route path="/edit/:id" component={EditEmployee} />
      </Layout>
    );
  }
}
