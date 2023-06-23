import React from 'react'
import { Modal } from 'react-bootstrap'
import { getMemoListOfBook } from '../../../functions/memo'
import MemoCard from './MemoCard'

const MemoAllModal = ({ show, setShow, bookId }) => {
    const [memoList, setMemoList] = React.useState([])
    React.useEffect(() => {
        getMemoListOfBook(bookId).then((memoList) => setMemoList(memoList))
    }, [])

    return (
		<Modal show={show} onHide={() => setShow(false)} fullscreen='md-down' size='xl' centered>
			<Modal.Header closeButton className='text-center'>
				<h2 className='w-100'>📋 메모</h2>
			</Modal.Header>

			<Modal.Body>
				{memoList.map((memo) => {
					return <MemoCard memo={memo} onClick={() => {}} lineLimit={10}/>
				})}
			</Modal.Body>
		</Modal>
	)
}

export default MemoAllModal