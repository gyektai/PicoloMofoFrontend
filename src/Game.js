import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './static/Game.css';


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.deckTitle = this.props.match.params.title;
    this.allCards = ['START!'];
    this.colors = ['green', 'orange', 'blue', 'pink', 'purple', 'cyan'];
    const randCard = Math.floor(Math.random() * this.allCards.length);
    const randColor = Math.floor(Math.random() * this.colors.length);
    this.state = {
      cardNum: randCard,
      card: this.allCards[0],
      bgColor: randColor,
    };
  }

  componentDidMount() {
    axios.get(`/api/decks/${this.deckTitle}`)
      .then(res => {
        const myDeck = res.data;
        for(let i=0; i < myDeck.cards.length; i++){
          axios.get(`/api/cards/${myDeck.cards[i]}`)
            .then(r => {
              this.allCards.push(r.data.present);
            })
        }
      })
  }

  handleNextCard = () => {
    const addToCard = Math.floor(Math.random() * 3) + 1;
    const addToColor= Math.floor(Math.random() * 3) + 1;
    const newCardIndex = (this.state.cardNum + addToCard) % this.allCards.length;
    const newColorIndex = (this.state.bgColor + addToColor) % this.colors.length;

    this.setState(state => ({
      cardNum: newCardIndex,
      card: this.allCards[newCardIndex],
      bgColor: newColorIndex,
    }));
  }

  render() {
    const color = this.colors[this.state.bgColor]
    return (
      <div className={`stretch fill-window bg-${color}`}>
       {/* just for easy nav right now*/}
        <Link to='/' style={{color: "white"}}>Take me home tonight</Link> 
        <div className="card-label">{this.state.card}</div>
        <button className={`next-card-btn bg-${color}`} onClick={this.handleNextCard}>NEXT CARD</button>
      </div>
    );
  }
}

export default Game;
