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
						return (
							<div>{result.title}</div>
						);
					})}
				</div>
			);
		}
	};

	render() {
		const { query, loading, message } = this.state;
		return (
			<div className="container">
				<h2 className="heading">Live Search: React Application</h2>
				<label className="search-label" htmlFor="search-input">
					<input
						type="text"
						value={query}
						id="search-input"
						placeholder="Search Deck..."
						onChange={this.handleOnInputChange} />
					<i className="fa fa-search search-icon" />
				</label>
				{ this.renderSearchResults() }
			</div>
		)
	}
}

export default Search;