import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { changeName, updateLocalStorageName } from '../../functions/user'
import { ERROR_MESSAGE } from '../../messages/commonMessages'

const ChangeNameModal = ({ isModalOpen, setIsModalOpen }) => {
	const [newName, setNewName] = useState('')

	const handleChangeName = (e) => {
		e.preventDefault()

		if (newName === '') {
			toast.error('새로운 이름을 입력해 주세요')
			return
		}

		changeName(newName).then((success) => {
			if (success) {
				toast.success(`이름을 ${newName}으로 변경했어요`)
				setIsModalOpen(false)
				updateLocalStorageName(newName)
				setNewName('')
			} else {
				toast.error(ERROR_MESSAGE)
			}
		})
	}

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
			<Modal.Header className='text-center'>
				<h4 className='w-100'>이름 변경하기</h4>
			</Modal.Header>

			<Modal.Body>
				<Form onSubmit={(e) => handleChangeName(e)}>
					<Form.Control placeholder='변경할 이름을 입력해 주세요' onChange={(e) => setNewName(e.target.value)} />

					<Button type='submit' variant='success' className='mt-3 w-100'>
						변경하기
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	)
}

export default ChangeNameModal
