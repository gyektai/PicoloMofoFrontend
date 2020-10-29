import React, { Component } from "react";
import './static/Game.css';


class Game extends React.Component {
      constructor(props) {
        super(props);
        this.allCards = ['DRINK A TON', 'NOW DRINK SOME MORE!', 'TAKE A SHOT', '2 SHOTS', 'SHOT WITH A BUDDY', 'CATEGORIES - LOSER DRINKS', 'TALLEST DRINKS', 'HIGHEST GPA TAKES A SHOT', 'PICK SOMEONE TO DRINK', 'PICK 2 TO DRINK', 'KILL YOUR DRINK', 'BITCHES DRINK', 'COUPLES DRINK', 'GUYS DRINK'];
        this.colors = ['green', 'orange', 'blue', 'pink', 'purple', 'cyan'];
        let randCard = Math.floor(Math.random() * this.allCards.length);
        let randColor = Math.floor(Math.random() * this.colors.length);
        this.state = {
          cardNum: randCard,
          card: this.allCards[0],
          bgColor: randColor,
        };
      }


      render() {
        let color = this.colors[this.state.bgColor]
        return (
          <div className={`stretch fill-window bg-${color}`}>
            <div className="card-label">{this.state.card}</div>
            <button className={`next-card-btn bg-${color}`} onClick={this.nextCard}>NEXT CARD</button>
          </div>
        );
      }

      nextCard = () => {
        let addToCard = Math.floor(Math.random() * 3) + 1;
        let addToColor= Math.floor(Math.random() * 3) + 1;
        let newCardIndex = (this.state.cardNum + addToCard) % this.allCards.length;
        let newColorIndex = (this.state.bgColor + addToColor) % this.colors.length;

        this.setState(state => ({
          cardNum: newCardIndex,
          card: this.allCards[newCardIndex],
          bgColor: newColorIndex,
        }));
      }
    }

export default Game;
