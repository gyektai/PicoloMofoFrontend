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
			deck: "",
		}

	}

	componentDidMount() {
	    axios.get('/api/decks')
	      .then(res => {
	        let decks = res.data;
	        console.log(decks);
	        for(let i = 0; i < decks.length; i++){
	        	this.allDecks.push(decks[i].title);
	        }
	        console.log(this.allDecks);
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
		for(let i = 0; i < this.allDecks.length; i++){
			deckButtons.push(
				<button 
				onClick={() => this.handlePick(this.allDecks[i])} 
				className={`deck-option bg-${this.bgColor}`}
				>
				{this.allDecks[i]}
				</button>
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