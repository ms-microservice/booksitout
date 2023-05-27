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
import Error from '../components/common/Error';
import location from './locationFunction'

const LibraryNearCard = () => {
	const [nearLibraryList, setNearLibraryList] = React.useState<null | LibraryType[] | undefined>(null)
	
	const [latitude, setLatitude] = React.useState<number | null>(null)
	const [longitude, setLongitude] = React.useState<number | null>(null)
	const [locationName, setLocationName] = React.useState<string | null>(null)
	const [locationError, setLocationError] = React.useState<boolean>(false)

	React.useEffect(() => {
		const getLocation = async () => {
			const locationResult = location.getLatitudeAndLongitude()

			if (locationResult === undefined || locationResult[0] === null || locationResult[1] === null) {
				setLocationError(true)
			} else {
				setLatitude(locationResult[0])
				setLongitude(locationResult[1])
				const address = await location.getAddressByLatitudeAndLongitude(locationResult[0], locationResult[1])
				setLocationName(address)
			}
		}

		getLocation()
	}, [])

	React.useEffect(() => {
		if (latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined) {
			booksitoutServer
				.get(`v5/library/available-library/by-radius?lat=${latitude}&long=${longitude}&radius=3000&size=20`)
				.then((res) => setNearLibraryList(res.data.content))
				.catch(() => setNearLibraryList(undefined))
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
						{nearLibraryList === undefined ? (
							<Error message='서버에 오류가 났어요' mt='50px'/>
						) : nearLibraryList == null ? (
							<Loading mt='100px' message='' />
						) : nearLibraryList.length === 0 ? (
							<NoContent message='2km 내에 도서관이 없어요' />
						) : (
							<div className='row'>
								{nearLibraryList.map((library) => {
									return (
										<div className='col-12 col-md-6'>
											<SimpleLibraryCard library={library} />
										</div>
									)
								})}
							</div>
						)}
					</>
				)}

				<AllButton url={`/library/near`} />
			</Card.Body>
		</Card>
	)
}

export default LibraryNearCard