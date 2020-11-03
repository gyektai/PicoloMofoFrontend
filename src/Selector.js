import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './static/Selector.css';

class Selector extends React.Component {
	constructor(props){
		super(props);
		const colors = ['green', 'orange', 'blue', 'pink', 'purple', 'cyan'];
    	const randColor = Math.floor(Math.random() * colors.length);
    	this.bgColor = colors[randColor]
    	this.allDecks = [];
		this.state = {
			deck: "test",
		}

	}
	componentDidMount() {
	    axios.get('/api/decks')
	      .then(res => {
	        this.allDecks = res.data;
	        console.log(this.allDecks);
      })
	      this.setState();

  }
	handlePick = () => {
		this.setState(state => ({
			deck: "Yurrrr",
		}));
	}

	render() {
		const bgColor = this.state.bgColor;
		const deckButtons = [];
		for(let i = 0; i < 11; i++){
			deckButtons.push(
				<button onClick={this.handlePick} className={`deck-option bg-${this.bgColor}`}>Switch {i}</button>
				);
		}

		return (
			<div className={`fill-window bg-${this.bgColor}`}>
				
					{deckButtons}
				
				<Link to={`/play/${this.state.deck}`}>Play</Link>
			</div>
			)
	}
}

export default Selector;