import React from 'react'
import { Card } from 'react-bootstrap'

// Icons
import physicalBookIcon from '../../resources/images/book-form/physical-book.png'
import ebookBookIcon from '../../resources/images/book-form/ebook.png'
import audioBookIcon from '../../resources/images/book-form/audio-book.png'

const FormInfo = ({ form }) => {
	const formTextMap = new Map([
		['PHYSICAL', '종이책'],
		['EBOOK', '이북'],
		['AUDIO', '오디오북'],
	])
	const formIconMap = new Map([
		['PHYSICAL', physicalBookIcon],
		['EBOOK', ebookBookIcon],
		['AUDIO', audioBookIcon],
	])

	return (
		<Card>
			<Card.Body>
				<div className='row justify-content-center'>
					<div className='col-8'>
						<img src={formIconMap.get(form)} alt='' className='img-fluid mb-2' />
					</div>

					<h5 className='text-center'>{formTextMap.get(form)}</h5>
				</div>
			</Card.Body>
		</Card>
	)
}

export default FormInfo
