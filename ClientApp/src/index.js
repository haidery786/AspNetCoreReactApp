import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
//import { Counters } from "./components/Counters";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Router basename={baseUrl}>
    <Route component={App} />
  </Router>,
  rootElement
);

registerServiceWorker();
