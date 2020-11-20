import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Creator extends Component {
	constructor(props){
		super(props);
		this.state = {
			allCards: [],
			cardPresent: '',
			deckTitle: '',
			bgColor: 'green',

		}
	}

	handleAddCard = () => {
		const newCard = this.state.cardPresent;
		const newCards = this.state.allCards;
		newCards.push(newCard);
		this.setState({
			allCards: newCards,
			cardPresent: '',
		})
	}

	// Needs so much work. Need to post card to id tag in api. How the f
	handleDeckCreation = async deck => {
		const cards = this.state.allCards;
		const cardKeys = [];

		for(let i = 0; i < cards.length; i++){
			await axios
				.post('/api/cards/', {
					present: cards[i]
				})
				.then(response => {
					console.log(response);
					cardKeys.push(response.data.id);
				})
				.catch(error => {
					console.log(error);
				});
		}
		axios
			.post('/api/decks/', {
				title: this.state.deckTitle,
				cards: cardKeys
				})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
		});
		
		return;
	}

	handleDeckCreationNOT = () => {
		let i = 0;
		i = i+1;
	}

	handleTitleInputChange = (event) => {
		this.setState({
			deckTitle: event.target.value,
		});
	}

	handleCardInputChange = (event) => {
		this.setState({
			cardPresent: event.target.value,
		});
	}



	renderCardTags = () => {
		const {allCards} = this.state;
		return (
			<div>
				{allCards.map(card => {
					return <div>{card}</div>
				})}
			</div>
		);
	};

	render() {
		return (
		<div>
			<div>Create Your Deck</div>
			<div>Deck Title</div>
			<input 
				onChange={this.handleTitleInputChange}
				value={this.state.deckTitle} />
			<div>Add Card</div>
			<input 
				onChange={this.handleCardInputChange}
				value={this.state.cardPresent} />
			<button onClick={this.handleAddCard}>Add</button>
			<div>Cards</div>
			{ this.renderCardTags() }
			<button onClick={this.handleDeckCreation}>Create Deck!</button>
			<div>TITLED: {this.state.deckTitle}</div>
		</div>
		)
	}
}

export default Creator;