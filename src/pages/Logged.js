import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "../assets/css/selectize.css";
import "../assets/css/administrador.css";
import "../assets/css/responsive-administrador.css";

import Dashboard from "./Dashboard";

export default class Logged extends Component {

  render() {
    return (
      <div className="App">
        <Router>
            <Route path="/dashboard" exact component={Dashboard} />
        </Router>
      </div>
    );
  }
}
