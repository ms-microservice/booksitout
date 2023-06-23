import React from 'react'
import { Button } from 'react-bootstrap'
import styled from 'styled-components';
import booksitoutIcon from '../icons/booksitoutIcon';

const EditorFormButton = ({ labelLanguage, setLabelLanguage }) => {
    const toggleLanguage = () => {
		setLabelLanguage(labelLanguage === 'english' ? 'korean' : 'english')
	}

	return (
		<ButtonContainer>
			<Button variant="book" onClick={toggleLanguage}>
				<booksitoutIcon.convert />
			</Button>
		</ButtonContainer>
	)
}

const ButtonContainer = styled.div.attrs({
	className: '',
})`
	position: absolute;
    right: 40px;
    top: 60px;
`

export default EditorFormButton