import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'
import LibraryTextWithIcon from './LibraryTextWithIcon'

import { TbLocationFilled as LocationIcon } from 'react-icons/tb'
import {  BsBookHalf as BookIcon } from 'react-icons/bs'

const LibraryCardLoading = () => {
    return (
		<Card className='mb-3' style={{ minHeight: '125px' }}>
			<Card.Body>
				<div className='row'>
					<div className='col-8'>
						<h4>
							<Placeholder as={Card.Text} animation='glow' className='mb-0'>
								<Placeholder xs={7} />
							</Placeholder>
						</h4>
					</div>

					<div className='col-4'>
						<h5 className='text-end text-secondary'>
							<Placeholder as={Card.Text} animation='glow' className='mb-0'>
								<Placeholder xs={3} />
							</Placeholder>
						</h5>
					</div>
				</div>

				<div className='ms-4'>
					<LibraryTextWithIcon
						icon={<LocationIcon />}
						text={
							<Placeholder as={Card.Text} animation='glow' className='mb-0'>
								<Placeholder xs={3} />
							</Placeholder>
						}
					/>

					<LibraryTextWithIcon
						icon={<BookIcon />}
						text={
							<Placeholder as={Card.Text} animation='glow' className='mb-0'>
								<Placeholder xs={3} />
							</Placeholder>
						}
					/>
				</div>
			</Card.Body>
		</Card>
	)
}

export default LibraryCardLoading