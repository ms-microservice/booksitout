import React from 'react'
import { Card } from 'react-bootstrap'
import { TbLocationFilled as LocationIcon } from 'react-icons/tb'
import LocationError from './LocationError'
import { booksitoutServer } from '../functions/axios'
import { LibraryType } from './LibraryType'
import SimpleLibraryCard from './SimpleLibraryCard'
import Loading from '../components/common/Loading'
import AllButton from '../components/common/AllButton'
import NoContent from '../components/common/NoContent'

const LibraryNearCard = () => {
	const [nearLibraryList, setNearLibraryList] = React.useState<null | LibraryType[]>(null)
	
	const [latitude, setLatitude] = React.useState<number | null>(null)
	const [longitude, setLongitude] = React.useState<number | null>(null)
	const [locationName, setLocationName] = React.useState<string | null>('서울특별시 영등포구')
	const [locationError, setLocationError] = React.useState<boolean>(false)
	React.useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLatitude(position.coords.latitude)
					setLongitude(position.coords.longitude)
				},
				(error) => setLocationError(true)
			)
		} else {
			setLocationError(true)
		}
	}, [])

	React.useEffect(() => {
		if (latitude !== null && longitude !== null) {
			booksitoutServer
				.get(`v5/library/available-library/by-radius?lat=${latitude}&long=${longitude}&radius=20000&size=6`)
				.then((res) => setNearLibraryList(res.data.content))
		}
	}, [latitude, longitude])

    return (
		<Card style={{ minHeight: '450px' }}>
			<Card.Body>
				<div className='d-flex mb-3'>
					<h3>
						<LocationIcon className='me-2 text-book' />
					</h3>
					<h3 className='pt-1'>내 주변 도서관</h3>

					<h6 className='text-secondary ms-2 mt-3'>{locationName ?? '?'}</h6>
				</div>

				{locationError ? (
					<LocationError />
				) : (
					<>
						{nearLibraryList == null ? (
							<Loading mt='100px' message='' />
						) : nearLibraryList.length === 0 ? (
							<NoContent message='2km 내에 도서관이 없어요' />
						) : (
							<>
								<div className='row'>
									{nearLibraryList.map((library) => {
										return (
											<div className='col-12 col-md-6'>
												<SimpleLibraryCard library={library} />
											</div>
										)
									})}
								</div>
							</>
						)}
					</>
				)}

				<AllButton url={`/library/near`} />
			</Card.Body>
		</Card>
	)
}

export default LibraryNearCard