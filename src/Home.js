import React, { Component } from "react";
import { Link } from "react-router-dom";
import './static/Home.css';

class Home extends React.Component {

  handlePlay = () => {

  }

  render() {

    return (

        <div className="bg-pink fill-window">
          <div className="tc-txt tc-top">It&apos;s <span style={{fontSize: 180}}>Picolo</span>,</div>
          <div className="tc-txt tc-bot">Mofo!</div>
          <Link to='/play/default' className="btn-play">PLAY &rarr;</Link>
          <Link to='/deck-selector' className="btn-deck-select">Custom Deck &nbsp;&nbsp;&nbsp;</Link>
        </div>

      )
  }
}
export default Home;
