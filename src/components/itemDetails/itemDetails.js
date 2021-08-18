import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import styled from 'styled-components';



const ItemDetailsBlock = styled.div`
	background-color: #fff;
	padding: 25px 25px 15px 25px;
	margin-bottom: 40px;
	h4 {
		margin-bottom: 20px;
		text-align: center;
	}

`
const Term = styled.span`
	font-weight: bold;
`
const SelectError = styled.span`
	color: #fff;
	text-align: center;
	font-size: 26px;
`


const Field = ({ item, field, label }) => {
	return (
		<ListGroupItem className="d-flex justify-content-between">
			<Term>{label}</Term>
			<span>{item[field]}</span>
		</ListGroupItem>
	)
}

export {Field};

export default class ItemDetails extends Component {

	state = {
		item: null,
		loading: true,
		error: false
	}

	componentDidMount() {
		this.updateItem();
	}
	// проверка на совпадение props
	componentDidUpdate(prevProps) {
		if (this.props.itemId !== prevProps.itemId) {
			this.updateItem();
		}
	}

	onItemDetailsLoaded = (item) => {
		this.setState({
			item,
			loading: false
		})
	}

	updateItem() {
		const { itemId, getData } = this.props;

		if (!itemId) {
			return;
		}

		this.setState({
			loading: true
		})

		getData (itemId)
			.then(this.onItemDetailsLoaded)
			.catch(this.onError)
	}

	onError() {
		this.setState({
			item: null,
			error: false
		})
	}


	render() {
		const { item, loading, error } = this.state;

		if (!item && error) {
			return <ErrorMessage />
		} else if (!item) {
			return <SelectError>Please select a character</SelectError>
		}

		if (loading) {
			return (
				<ItemDetailsBlock className="rounded">
					<Spinner />
				</ItemDetailsBlock>
			)
		}

		const { name } = item;

		return (
			<ItemDetailsBlock className="rounded">
				<h4>{name}</h4>
				<ListGroup flush>
					{
						React.Children.map(this.props.children, (child) => {
							return React.cloneElement(child, {item})
						})
					}
				</ListGroup>
			</ItemDetailsBlock>
		);
	}
}