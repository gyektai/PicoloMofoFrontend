import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {

  render() {
    return (

        <div>
          <h1>Home Page</h1>
          <Link to='/play'>Play Game!</Link>
        </div>

      )
  }
}
export default Home;
