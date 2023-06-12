import { Card, Button } from 'react-bootstrap'
import parse from 'html-react-parser'
import utils from '../functions/utils'
import { faqData } from './faqData';
import RouteTitle from '../common/RouteTitle';
import booksitoutIcon from '../common/icons/booksitoutIcon';

const FaqRoute = () => {
	return (
		<div className='container-xl mt-5 mb-5'>
			<RouteTitle icon={<booksitoutIcon.faq />} title={'자주 묻는 질문'} />

			{faqData.map((faq) => {
				return (
					<Card className='mt-4'>
						<Card.Header className='text-white border-0' style={{ background: '#1cb15a' }}>
							<h5 className='mt-1'>{faq.question}</h5>
						</Card.Header>

						<Card.Body>{parse(faq.answer)}</Card.Body>
					</Card>
				)
			})}

			<div className='row justify-content-center mt-5'>
				{(utils.getToken() === '' || typeof utils.getToken() === 'undefined' || utils.getToken() == null) && (
					<div className='col-12 col-lg-7 mt-3'>
						<a href='/login' className='w-100'>
							<Button variant='book' className='w-100'>
								로그인하기
							</Button>
						</a>
					</div>
				)}

				<div className='col-12 col-lg-7 mt-3'>
					<a href='/qna' className='w-100'>
						<Button variant='secondary' className='w-100'>
							직접 질문하기
						</Button>
					</a>
				</div>
			</div>
		</div>
	)
}

export default FaqRoute
