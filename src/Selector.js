import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './static/Selector.css';
import Search from "./Search";

class Selector extends React.Component {
	constructor(props){
		super(props);
		const colors = ['green', 'orange', 'blue', 'pink', 'purple', 'cyan'];
    	const randColor = Math.floor(Math.random() * colors.length);
    	this.bgColor = colors[randColor]
    	this.allDecks = [];
		this.state = {
			deck: "",
		}

	}

	componentDidMount() {
	    axios.get('/api/decks')
	      .then(res => {
	        let decks = res.data;
	        for(let i = 0; i < decks.length; i++){
	        	this.allDecks.push(decks[i].title);
	        }
	       	this.setState({
	      		deck: "Default",
	      });
      })


  	}

	handlePick = (deckName) => {
		this.setState(state => ({
			deck: deckName,
		}));
	}

	render() {
		const deckButtons = [];
		for(let i = 0; i < 10; i++){
			const curDeck = this.allDecks[i];
			if(curDeck === this.state.deck){
				deckButtons.push(
					<button
					onClick={() => this.handlePick(curDeck)}
					className={`deck-option deck-selected bg-${this.bgColor}`}
					>
					&#9733; &nbsp; {curDeck} &nbsp; &#9733;
					</button>
					);
			} else {
			deckButtons.push(
				<button 
				onClick={() => this.handlePick(curDeck)} 
				className={`deck-option bg-${this.bgColor}`}
				>
				{curDeck}
				</button>
				);
		}
		}

		return (
			<div className={`fill-window bg-${this.bgColor}`}>				
				{deckButtons}
				<Link to={`/play/${this.state.deck}`}>Play</Link>
				<Search />
			</div>
			)
	}
}

export default Selector;