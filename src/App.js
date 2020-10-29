import './static/Game.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Game";
import Home from "./Home";


class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/play" component={Game} />
          </Switch>
        </div>
      </Router>
      )
  }
}

export default App;
