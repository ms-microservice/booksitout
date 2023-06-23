import React from 'react'
import toast from 'react-hot-toast'

import { AiFillMinusCircle as DeleteIcon } from 'react-icons/ai'
import { MdAddCircle as AddIcon } from 'react-icons/md'
import messages from '../messages'
import { Button, Card, Form } from 'react-bootstrap'

const AddRemoveSearchSettings = ({ title, includedLabel, excludedLabel, initialServiceList, apiFunction, localStorageKey }) => {
	const iconStyle = { widht: '50px', height: '50px' }

	const [buttonDisabled, setButtonDisabled] = React.useState(true)
	const [serviceList, setServiceList] = React.useState(initialServiceList)

	const includeExclude = (key: string) => {
		setServiceList(serviceList.map((s) => (s.key === key ? { ...s, included: !s.included } : s)))
	}

	React.useEffect(() => {
		const filteredList = serviceList.filter((service) => initialServiceList.find((s) => s.key === service.key).included === service.included)
		setButtonDisabled(filteredList.length >= serviceList.length)
	}, [serviceList, initialServiceList])

	const handleSubmit = (e) => {
		e.preventDefault()

		const range: string = serviceList
			.filter((s) => s.included)
			.map((s) => s.key)
			.join(',')

		apiFunction(range).then((status) => {
			if (status === 200) {
				localStorage.setItem(`${localStorageKey}-api`, range.toUpperCase())
				toast.success(`${title} 범위를 수정했어요`)
				setButtonDisabled(true)
			} else {
				toast.error(messages.error)
			}
		})
	}

	return (
		<Card className='h-100'>
			<Card.Body className='h-100'>
				<h3 className='mb-5'>{title}</h3>

				<Form onSubmit={(e) => handleSubmit(e)}>
					<Card
						className='mb-3 text-center'
						style={{ height: '180px', overflow: serviceList.filter((s) => s.included).length > 4 ? 'scroll' : 'hidden' }}>
						<Card.Header style={{ backgroundColor: 'rgb(83, 165, 81)', color: 'white' }}>{includedLabel}</Card.Header>

						<Card.Body>
							<div className='row justify-content-center'>
								{serviceList
									.filter((s) => s.included)
									.map((service) => {
										return (
											<div className='col-3 button-hover p-0 mb-3' onClick={() => includeExclude(service.key)}>
												<DeleteIcon className='h5 text-danger ms-5 position-absolute' />

												<img src={service.icon} alt='' className='img-fluid rounded' style={iconStyle} />
												<h6 className='mt-2 clamp-1-line'>{service.name}</h6>
											</div>
										)
									})}
							</div>
						</Card.Body>
					</Card>

					<Card
						className='mb-3 text-center'
						style={{ height: '180px', overflow: serviceList.filter((s) => !s.included).length > 4 ? 'scroll' : 'hidden' }}>
						<Card.Header style={{ backgroundColor: 'rgb(203, 68, 74)', color: 'white' }}>{excludedLabel}</Card.Header>

						<Card.Body>
							<div className='row justify-content-center'>
								{serviceList
									.filter((s) => !s.included)
									.map((service) => {
										return (
											<div className='col-3 button-hover mb-3' onClick={() => includeExclude(service.key)}>
												<AddIcon className='h5 text-success ms-5 position-absolute' />

												<img src={service.icon} alt='' className='img-fluid rounded' style={iconStyle} />
												<h6 className='mt-2 clamp-1-line'>{service.name}</h6>
											</div>
										)
									})}
							</div>
						</Card.Body>
					</Card>

					<div className='row justify-content-center'>
						<div className='col-12 col-lg-6'>
							<Button variant='book' type='submit' className='w-100' disabled={buttonDisabled}>
								수정하기
							</Button>
						</div>
					</div>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default AddRemoveSearchSettings