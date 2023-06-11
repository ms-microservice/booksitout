import React from 'react'
import { Card } from 'react-bootstrap'
import LocationError from './LocationError'
import { booksitoutServer } from '../functions/axios'
import { LibraryType } from './LibraryType'
import SimpleLibraryCard from './SimpleLibraryCard'
import AllButton from '../common/AllButton'
import NoContent from '../common/NoContent'
import Error from '../common/Error'
import location from './locationFunction'
import CardTitle from '../common/CardTitle'
import { IoReloadCircle as ReloadIcon } from 'react-icons/io5'
import toast from 'react-hot-toast'
import SimpleLibraryCardLoading from './SimpleLibraryCardLoading'
import booksitoutIcon from '../common/icons/booksitoutIcon';

const LibraryNearCard = ({ col = 'col-12 col-md-6', moreButton=true, size=6, mt=0 }) => {
	const [initialFetch, setInitialFetch] = React.useState<boolean>(true)

	const [latitude, setLatitude] = React.useState<number | null | undefined>(null)
	const [longitude, setLongitude] = React.useState<number | null | undefined>(null)
	const [locationName, setLocationName] = React.useState<string | null>(null)
	const [locationError, setLocationError] = React.useState<boolean>(false)
	
	React.useEffect(() => {
		setTimeout(() => {
			setInitialFetch(false)
		}, 300)
		
		const getLocation = async () => {
			location.getLatitudeAndLongitude().then((locationResult) => {
				if (locationResult === undefined || locationResult[0] === null || locationResult[1] === null) {
					setLocationError(true)
				} else {
					setLatitude(locationResult[0])
					setLongitude(locationResult[1])
					location.getAddressByLatitudeAndLongitude(locationResult[0], locationResult[1]).then((address) => setLocationName(address))
				}
			})
			.catch(() => {
				setLatitude(undefined)
				setLongitude(undefined)
			})

		}

		getLocation()
	}, [])

	const [nearLibraryList, setNearLibraryList] = React.useState<null | LibraryType[] | undefined>(null)
	React.useEffect(() => {
		if (latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined) {
			booksitoutServer
				.get(`v5/library/available-library/by-radius?lat=${latitude}&long=${longitude}&radius=3000&size=${size}`)
				.then((res) => setNearLibraryList(res.data.content))
				.catch(() => setNearLibraryList(undefined))
				.finally(() => setInitialFetch(false))
		}
	}, [latitude, longitude])

	const getLocationNoCache = async () => {
		return location.getLatitudeAndLongitudeNoCache().then((locationResult) => {
			if (locationResult === undefined || locationResult == null || locationResult[0] === null || locationResult[1] === null) {
				// setLocationError(true)
				return false
			} else {
				setLatitude(locationResult[0])
				setLongitude(locationResult[1])
				location.getAddressByLatitudeAndLongitude(locationResult[0], locationResult[1]).then((address) => setLocationName(address))
				return true
			}
		})
	}

	const refreshLocation = () => {
		toast.loading('위치를 가져오고 있어요')
		getLocationNoCache().then((result) =>
			result ? toast.success('위치를 업데이트 했어요') : toast.error('위치를 가져올 수 없었어요. 잠시 후 다시 시도해 주세요')
		)
	}

	return (
		<Card style={{ minHeight: '500px' }} className='h-100'>
			<ReloadIcon
				className='text-book clickable'
				onClick={refreshLocation}
				style={{ fontSize: '40px', position: 'absolute', right: '2.5%', top: '20px' }}
			/>

			<a href='/library/near' className='text-black'>
				<Card.Body>
					<CardTitle icon={<booksitoutIcon.location />} title={'내 주변 도서관'} subTitle={locationName ?? ''} />

					<div className='h-100'>
						{initialFetch ? (
							<></>
						) : nearLibraryList == null ? (
							<div className={`row row-eq-height mt-${mt}`}>
								{Array.from({ length: 6 }).map(() => {
									return (
										<div className='col-12 col-md-6 h-100'>
											<SimpleLibraryCardLoading />
										</div>
									)
								})}
							</div>
						) : latitude === undefined || longitude === undefined || locationError ? (
							<LocationError move={-80} />
						) : nearLibraryList === undefined ? (
							<Error move={-80} />
						) : nearLibraryList.length === 0 ? (
							<NoContent message='2km 내에 도서관이 없어요' move={-80}/>
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
					</div>

					{moreButton && (
						<>
							<div className='pt-3' />
							<AllButton url={`/library/near`} col={col} />
						</>
					)}
				</Card.Body>
			</a>
		</Card>
	)
}

export default LibraryNearCard