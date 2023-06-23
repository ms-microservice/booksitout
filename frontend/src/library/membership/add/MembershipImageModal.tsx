import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import MembershipCardLoading from '../MembershipCardLoading'
import MembershipAddFormImageEditCard from './MembershipAddFormImageEditCard'
import MembershipCard from '../MembershipCard'
import { booksitoutServer } from '../../../functions/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

const MembershipImageModal = ({ image, membership, setMembership, show, onHide }) => {
    const navigate = useNavigate()

    const addMembership = () => {
		toast.loading('회원증을 추가하고 있어요')

		const membershipToAdd = {
			number: membership?.number,
			typeId: membership?.typeId,
			memo: '',
		}

		booksitoutServer
			.post('v5/library/membership', membershipToAdd)
			.then(() => {
				toast.success('회원증을 추가했어요')
				navigate('/library/membership/all')
			})
			.catch(() => {
				toast.error('오류가 났어요. 잠시 후 다시 시도해 주세요')
			})
	}

	return (
		<Modal show={show} onHide={onHide} centered fullscreen="md-down" size="xl" backdrop="static">
			<Modal.Header closeButton className="text-center">
				<h3 className="w-100">인식된 회원증 수정하기</h3>
			</Modal.Header>

			<Modal.Body>
				<div className="row justify-content-center align-items-center" style={{ overflowX: 'hidden' }}>
					<div className="col-12 col-md-4 text-center d-none d-md-block">
						<Image src={image} alt="" />
					</div>

					<div className="col-12 col-md-8 mt-4 mt-md-0">
						{image == null ? (
							<></>
						) : membership == null ? (
							<MembershipCardLoading />
						) : (
							<div className="not-clickable">
								<MembershipCard membership={membership} />
							</div>
						)}

						<div className="mt-3" />

						{image == null ? (
							<></>
						) : membership == null ? (
							<Card style={{ minHeight: '440px' }}></Card>
						) : (
							<MembershipAddFormImageEditCard membership={membership} setMembership={setMembership} />
						)}
					</div>

					<AddButtonContainer>
						<Button variant="book" className="w-100" onClick={() => addMembership()}>
							회원증 추가하기
						</Button>
					</AddButtonContainer>
				</div>
			</Modal.Body>
		</Modal>
	)
}

const AddButtonContainer = styled.div.attrs({
	className: 'col-12 col-md-6 mt-4 mb-3',
})`
	width: 100%;
`

const Image = styled.img.attrs({
	className: 'rounded border img-fluid',
})`
	max-height: 600px;

	@media screen and (max-width: 680px) {
		max-height: 500px;
	}
`

export default MembershipImageModal