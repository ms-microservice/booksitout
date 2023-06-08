import React from 'react'
import { Card } from 'react-bootstrap'
import uiSettings from '../../../settings/ui'

const MemoCard = ({memo, onClick, lineLimit=2}) => {
    return (
		<Card style={{ backgroundColor: uiSettings.color.memo }} onClick={onClick} className='mb-2 clickable'>
			<Card.Header>
				<h6 className='text-center mt-1'>{memo.page}P</h6>
			</Card.Header>

			<Card.Body>
				<div className='row'>
					<div className={`text-center clamp-${lineLimit}-line`}>{memo.content}</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default MemoCard