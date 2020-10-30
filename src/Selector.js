import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Selector extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			deck: "test",
		}

	}

	handlePick = () => {
		this.setState(state => ({
			deck: "Yurrrr",
		}));
	}

	render() {
		return (
			<div>
				<button onClick={this.handlePick}>Switch</button>
				<Link to={`/play/${this.state.deck}`}>Play</Link>
			</div>
			)
	}
}

export default Selector;