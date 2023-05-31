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
import CardTitle from '../common/CardTitle'

import { IoReloadCircle as ReloadIcon } from 'react-icons/io5'
import toast from 'react-hot-toast'

const LibraryNearCard = ({ col = 'col-12 col-md-6', moreButton=true, size=6, mt=0 }) => {
	const [nearLibraryList, setNearLibraryList] = React.useState<null | LibraryType[] | undefined>(null)

	const [latitude, setLatitude] = React.useState<number | null>(null)
	const [longitude, setLongitude] = React.useState<number | null>(null)
	const [locationName, setLocationName] = React.useState<string | null>(null)
	const [locationError, setLocationError] = React.useState<boolean>(false)

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

	const getLocationNoCache = async () => {
		const locationResult = await location.getLatitudeAndLongitudeNoCache()

		if (locationResult === undefined || locationResult[0] === null || locationResult[1] === null) {
			setLocationError(true)
		} else {
			setLatitude(locationResult[0])
			setLongitude(locationResult[1])
			const address = await location.getAddressByLatitudeAndLongitude(locationResult[0], locationResult[1])
			setLocationName(address)
		}
	}

	React.useEffect(() => {
		getLocation()
	}, [])

	React.useEffect(() => {
		if (latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined) {
			booksitoutServer
				.get(`v5/library/available-library/by-radius?lat=${latitude}&long=${longitude}&radius=30000&size=${size}`)
				.then((res) => setNearLibraryList(res.data.content))
				.catch(() => setNearLibraryList(undefined))
		}
	}, [latitude, longitude])

	const refreshLocation = () => {
		toast.loading('위치를 가져오고 있어요')
		getLocationNoCache().then(() => toast.success('위치를 업데이트 했어요'))
	}

	return (
		<Card style={{ minHeight: '500px' }} className='h-100'>
			<Card.Body>
				<div className='row'>
					<div className='col-10'>
						<CardTitle icon={<LocationIcon />} title={'내 주변 도서관'} subTitle={locationName ?? ''} />
					</div>

					<div className='col-2'>
						<ReloadIcon
							className='text-book clickable'
							onClick={refreshLocation}
							style={{ fontSize: '40px', position: 'absolute', right: '2.5%', top: '20px' }}
						/>
					</div>
				</div>

				{locationError ? (
					<LocationError />
				) : (
					<>
						{nearLibraryList === undefined ? (
							<Error />
						) : nearLibraryList == null ? (
							<Loading mt='100px' message='' />
						) : nearLibraryList.length === 0 ? (
							<NoContent message='2km 내에 도서관이 없어요' />
						) : (
							<div className={`row row-eq-height mt-${mt}`}>
								{nearLibraryList.map((library) => {
									return (
										<div className='col-12 col-md-6 h-100'>
											<SimpleLibraryCard library={library} />
										</div>
									)
								})}
							</div>
						)}
					</>
				)}

				{moreButton && (
					<>
						<div className='pt-3' />
						<AllButton url={`/library/near`} col={col} />
					</>
				)}
			</Card.Body>
		</Card>
	)
}

export default LibraryNearCard