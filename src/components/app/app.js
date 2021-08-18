import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharacterPage, BooksPage, HousesPage, BooksItem } from '../pages';
import GotService from '../../services/gotService';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import './app.css';
import styled from 'styled-components';


const ButtonRandomBlock = styled.button`
	padding: 12px;
   background-color: #1e2edb;
   border: none;
   border-radius: 4px;
   color: #fff;
   margin-bottom: 40px;
   outline: none;
   box-shadow: 0px 0px 30px rgba(256,256,256,.1);
   cursor: pointer;
	:focus {
		outline: none;
	}
`


export default class App extends Component {

	gotService = new GotService();

	state = {
		showRandomChar: true,
		error: false
	}

	componentDidCatch() {
		this.setState({
			error: true
		})
	}

	toggleRandomChar = () => {
		this.setState(state => {
			return {
				showRandomChar: !state.showRandomChar
			};
		})
	}


	render() {
		const char = this.state.showRandomChar ? <RandomChar/> : null;

		if (this.state.error) {
			return <ErrorMessage />
		}

		return (
			<Router>
				<div className='app'>
					<Container>
						<Header />
					</Container>
					<Container>
						<Row>
							<Col lg={{ size: 6, offset: 0 }}>
								{char}
								<ButtonRandomBlock
									onClick={this.toggleRandomChar} >
									Toggle random character
								</ButtonRandomBlock>
							</Col>
						</Row>

						<Route path='/characters' component={CharacterPage} />
						<Route path='/houses' component={HousesPage} />
						<Route path='/books' exact component={BooksPage} />
						<Route path='/books/:id' render={
							({match}) => {
								const {id} = match.params;
							return <BooksItem bookId={id} />}
						} />

					</Container>
				</div>
			</Router>
		);
	}
}


