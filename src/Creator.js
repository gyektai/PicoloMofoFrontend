import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './static/Creator.css'

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

	cardKeyPress = (event) => {
		if (event.key === 'Enter') {
			this.handleAddCard();
		}
	}



	renderCardTags = () => {
		const {allCards} = this.state;
		return (
			<div>
				{allCards.map(card => {
					return <div className="card-added">{card}</div>
				})}
			</div>
		);
	};

	render() {
		return (
		<div className="fill-window bg-blue">
			<div className="heading">Create Your Deck</div>
			<div className="container">
				<label className="search-label">
					<input 
						className="title-input"
						placeholder="Title"
						onChange={this.handleTitleInputChange}
						value={this.state.deckTitle} />
				</label>
			</div>
			<div className="container big">
				<input 
					placeholder="Write a new card"
					onKeyDown={this.cardKeyPress}
					onChange={this.handleCardInputChange}
					value={this.state.cardPresent} />
			</div>
			<Link
				to={'/'}
				className="btn-create"
				onClick={this.handleDeckCreation}>
					Create!
			</Link>
			
			{ this.renderCardTags() }

		</div>
		)
	}
}

export default Creator;