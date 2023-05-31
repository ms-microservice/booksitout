import React from 'react'
import { Card } from 'react-bootstrap'
import LibraryTextWithIcon from './LibraryTextWithIcon'
import utils from '../functions/utils'

import { TbLocationFilled as LocationIcon } from 'react-icons/tb'
import {  BsBookHalf as BookIcon } from 'react-icons/bs'

const LibraryCard = ({library}) => {
    return (
		<a href={`/library/detail/${library.id}`}>
			<Card className='mb-3' style={{ minHeight: '125px' }}>
				<Card.Body>
					<div className='row'>
						<div className='col-8'>
							<h4>{library.name}</h4>
						</div>

						{library.location.distance !== 0 && (
							<div className='col-4'>
								<h5 className='text-end text-secondary'>{library.location.distance?.toFixed(2) ?? '-'} km</h5>
							</div>
						)}
					</div>

					<div className='ms-4'>
						<LibraryTextWithIcon icon={<LocationIcon />} text={library.location.address} />
						<LibraryTextWithIcon
							icon={<BookIcon />}
							text={`${library.bookCount === 0 ? '?' : utils.insertCommas(library.bookCount)} 권` ?? '?'}
						/>
					</div>
				</Card.Body>
			</Card>
		</a>
	)
}

export default LibraryCard