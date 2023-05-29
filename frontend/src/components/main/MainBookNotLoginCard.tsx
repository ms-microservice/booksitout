import React from 'react'
import { Button, Card, Placeholder } from 'react-bootstrap';

import bookCoverLoading from '../../resources/images/common/loading-default-book-cover.png'
import categoryLoading from '../../resources/images/common/library-loading.png'
import CardTitle from '../../common/CardTitle';
import {BsBookHalf as BookIcon} from 'react-icons/bs'

const MainBookNotLoginCard = () => {
    return (
		<Card className='h-100' style={{ minHeight: '420px' }}>
			<Card.Body className='h-100'>
				<CardTitle icon={<BookIcon />} title={'마지막으로 읽은 책'} subTitle={undefined} size='h3' iconSize='h2' />

				<div className='row row-eq-height justify-content-center mt-3'>
					<div className='mb-4 col-8 col-lg-4 align-self-center text-center'>
						<img
							className='img-fluid rounded text-decoration-none text-black'
							src={bookCoverLoading}
							style={{ maxHeight: '250px' }}
							alt=''
						/>
					</div>

					<div className='col-12 col-lg-8'>
						<h4>
							<Placeholder as={Card.Text} animation='wave'>
								<Placeholder xs='10' />
							</Placeholder>
						</h4>

						<h6 className='text-muted'>
							<Placeholder as={Card.Text} animation='wave'>
								<Placeholder xs='4' />
							</Placeholder>
						</h6>

						<Placeholder as={Card.Text} animation='wave' className='mt-3 mb-3'>
							<Placeholder xs='12' />
						</Placeholder>

						<div className='d-block d-md-none d-lg-block mt-5 mb-4'>
							<div className='row text-center justify-content-center'>
								<div className='col-4'>
									<BookInfoPlaceholder />
								</div>

								<div className='col-4'>
									<BookInfoPlaceholder />
								</div>

								<div className='col-4'>
									<BookInfoPlaceholder />
								</div>
							</div>
						</div>
					</div>

					<div className='row w-100' style={{ position: 'absolute', bottom: '20px' }}>
						<div className='col-6 mt-md-2'>
							<Button variant='book' className='w-100'>
								이어서 읽기
							</Button>
						</div>

						<div className='col-6 mt-md-2'>
							<Button variant='book-danger' className='w-100'>
								포기하기
							</Button>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

const BookInfoPlaceholder = () => {
    return (
		<Card>
			<Card.Body>
				<div className='row justify-content-center'>
					<div className='col-9 col-md-10 align-self-center p-0'>
						<img src={categoryLoading} alt='' style={{ height: '50px', width: '50px' }} className='img-fluid mb-0 mb-md-2 p-0 rounded' />
					</div>

					<div className='col-12 col-md-12 mt-2 mt-md-0'>
						<h6 className='text-center mb-0' style={{ whiteSpace: 'nowrap' }}>
							<Placeholder as={Card.Text} animation='wave'>
								<Placeholder xs='10' />
							</Placeholder>
						</h6>
					</div>
				</div>
			</Card.Body>
		</Card>
	)
}

export default MainBookNotLoginCard