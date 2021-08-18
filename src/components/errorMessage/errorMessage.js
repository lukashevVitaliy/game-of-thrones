import React from 'react';
import img from './error.jpg';

import styled from 'styled-components';



const ErrorMessageBlock = styled.span`
	font-weight: 500;
	color: red;
`
const ErrorMessageImg = styled.img`
	width: 100%;
`

const ErrorMessage = () => {
	return (
		<>
		<ErrorMessageImg src={img} alt='error'></ErrorMessageImg>
		<ErrorMessageBlock>Something goes wrong</ErrorMessageBlock>
		</>
	)
}

export default ErrorMessage;

