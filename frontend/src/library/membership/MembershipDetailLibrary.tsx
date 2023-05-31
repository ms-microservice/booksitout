import React from 'react'
import { Card } from 'react-bootstrap'
import CardTitle from '../../common/CardTitle'
import { ImLibrary as LibraryIcon} from 'react-icons/im'
import Preparing from '../../components/common/Preparing'

const MembershipDetailLibrary = () => {
    return (
		<Card style={{ minHeight: '600px' }}>
			<Card.Body>
				<CardTitle icon={<LibraryIcon />} title={'사용할 수 있는 도서관'} subTitle={undefined} textSize={2} />

				<Preparing message='아직 준비하고 있어요' mt='175px' />
			</Card.Body>
		</Card>
	)
}

export default MembershipDetailLibrary