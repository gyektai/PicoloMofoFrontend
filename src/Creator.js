import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Creator extends Component {
	constructor(props){
		super(props);
		this.state = {
			allCards: [],
			bgColor: 'green',
		}
	}

	render() {
		return (
			<button>Click</button>
		)
	}
}

export default Creator;