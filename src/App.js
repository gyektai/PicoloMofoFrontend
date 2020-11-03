import './static/Game.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Game from "./Game";
import Home from "./Home";
import Selector from "./Selector";
import Creator from "./Creator";


class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/play/:title" component={Game} />
            <Route path="/deck-selector" component={Selector} />
            <Route path="/create-deck" component={Creator} />
          </Switch>
        </div>
      </Router>
      )
  }
}

export default App;
