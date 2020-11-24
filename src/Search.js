import React, { Component } from "react";
import axios from "axios";
import './static/Search.css';

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			results: [],
			loading: false,
			message: '',
			deck: "",
		};
		this.cancel = '';
	}

	handleOnInputChange = (event) => {
		const query = event.target.value;
		if ( !query ) {
			this.setState({
				query,
				results: {},
				message: '',
			});
		} else {
			this.setState({
				query,
				loading: true,
				message: '',
				},
				() => {
					this.fetchSearchResults(1, query);
			});
		}
	};

	fetchSearchResults = (updatedPageNo = '', query) => {
		const pageNumber = updatedPageNo ? `&page=${updatedPageNo}`: '';

		const searchUrl = `/api/decks/?search=${query}`;

		if(this.cancel) {
			this.cancel.cancel();
		}

		this.cancel = axios.CancelToken.source();
		axios.get(searchUrl, {
			cancelToken: this.cancel.token
		})
			.then(res => {
				const resultNotFoundMsg = !res.data.length ? 'There are no more search results. Please Try a new search.' : '';

				this.setState({
					results: res.data,
					message: resultNotFoundMsg,
					loading: false,
				});
			})
			.catch((error) => {
				if (axios.isCancel(error) || error) {
					this.setState({
						loading: false,
						message: 'Failed to fetch results. Please check network',
					});
				}
			});
	};

	renderSearchResults = () => {
		const {results} = this.state;

		if (Object.keys(results).length && results.length) {
			return (
				<div className="results-container">
					{results.map(result => {
						if (result.title === this.props.deck){
							return <div onClick={() => this.props.handlePick(result.title)} className="search-result selected">&#9733; &nbsp; {result.title} &nbsp; &#9733;</div>
						}
						return (
							<div onClick={() => this.props.handlePick(result.title)} className="search-result">{result.title}</div>
						);
					})}
				</div>
			);
		}
	};

	render() {
		const { query, loading, message } = this.state;
		return (
			<div className="search-container">
				<div className="search-heading">Find Your Custom Deck</div>
				<label className="search-label" htmlFor="search-input">
					<input
						type="text"
						value={query}
						id="search-input"
						placeholder="Search Deck..."
						onChange={this.handleOnInputChange} />
										</label>
				{ this.renderSearchResults() }
			</div>
		)
	}
}

export default Search;