import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';
import PropTypes from 'prop-types';


export default class ItemList extends Component {

	state = {
		itemList: null,
		error: false
	}

	static defaultProps = {
		onItemSelected: () => {}
	}
	
	static propTypes = {
		onItemSelected: PropTypes.func
	}

	componentDidMount() {
		const {getData} = this.props;

		getData ()
			.then((itemList) => {
				this.setState({
					itemList,
					error: false
				})
			})
			.catch(this.onError)
	}

	onError () {
		this.setState({
			itemList: null,
			error: true
		})
	}

	componentDidCatch() {
		this.onError()
	}

	renderItems(arr) {
		return arr.map((item) => {
			const {id} = item;
			const label = this.props.renderItem(item)

			return (
				<ListGroupItem
					key={id}
					onClick={() => this.props.onItemSelected(id)} >
					{label}
				</ListGroupItem>
			)
		})
	}

	render() {

		const {itemList, error} = this.state;

		if (error) {
			return <ErrorMessage />
		}

		if (!itemList) {
			return <Spinner />
		} 

		const items = this.renderItems(itemList);

		return (
			<ListGroup style={{cursor: "pointer"}}>
				{items}
			</ListGroup>
		);
	}
}




