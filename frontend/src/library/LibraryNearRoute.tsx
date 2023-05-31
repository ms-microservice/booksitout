import React from 'react'
import { booksitoutServer } from '../functions/axios'
import { LibraryType } from './LibraryType'
import { Form } from 'react-bootstrap'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error';
import NoContent from '../components/common/NoContent';
import LocationError from './LocationError'
import location from './locationFunction'
import CardTitle from '../common/CardTitle'
import { TbLocationFilled as LocationIcon } from 'react-icons/tb'
import LibraryCard from './LibraryCard'
import { useNavigate, useParams } from 'react-router-dom'

const LibraryNearRoute = () => {
	const navigate = useNavigate()

	const { range } = useParams()
	const [currentRange, setCurrentRange] = React.useState<number>(Number(range) ?? 3)

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

    const [nearLibraryList, setNearLibraryList] = React.useState<null | LibraryType[] | undefined>(null)
	React.useEffect(() => {
		if (latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined) {
			booksitoutServer
				.get(`v5/library/available-library/by-radius?lat=${latitude}&long=${longitude}&radius=${currentRange * 1000}&size=20`)
				.then((res) => setNearLibraryList(res.data.content))
				.catch(() => setNearLibraryList(undefined))
		}
	}, [latitude, longitude, range])

	return (
		<div className='container-xl'>
			<div className='row justify-content-end mb-3'>
				<div className='col-12 col-md-10'>
					<CardTitle icon={<LocationIcon />} title='내 주변 도서관' subTitle={locationName ?? '?'} />
				</div>

				<div className='col-6 col-md-2 pt-md-3'>
					<Form>
						<Form.Select onChange={(e) => {
							navigate(`/library/near?range=${e.target.value}`)
							setCurrentRange(Number(e.target.value))
						}}>
							{[1, 2, 3, 4, 5].map((r) => {
								return (
									<option selected={r === currentRange} value={r}>
										{r}km 근처까지
									</option>
								)
							})}
						</Form.Select>
					</Form>
				</div>
			</div>

			{locationError ? (
				<LocationError />
			) : nearLibraryList === undefined ? (
				<Error message='서버에 오류가 났어요' />
			) : nearLibraryList == null ? (
				<Loading mt='100px' />
			) : nearLibraryList.length === 0 ? (
				<NoContent message={`${range}km 내에 도서관이 없어요`} textSize={2} iconSize={7} />
			) : (
				nearLibraryList.map((library) => {
					return <LibraryCard library={library} />
				})
			)}
		</div>
	)
}

export default LibraryNearRoute