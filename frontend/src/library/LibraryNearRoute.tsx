import React from 'react'
import { booksitoutServer } from '../functions/axios'
import { LibraryType } from './LibraryType'
import { Form } from 'react-bootstrap'
import Error from '../common/Error'
import NoContent from '../common/NoContent';
import LocationError from './LocationError'
import location from './locationFunction'
import CardTitle from '../common/CardTitle'
import { TbLocationFilled as LocationIcon } from 'react-icons/tb'
import LibraryCard from './LibraryCard'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import LibraryCardLoading from './LibraryCardLoading'
import { IoReloadCircle as ReloadIcon } from 'react-icons/io5'

const LibraryNearRoute = () => {
	document.title = '주변 도서관 | 책잇아웃'

	const navigate = useNavigate()

	const { range } = useParams()
	const [currentRange, setCurrentRange] = React.useState<number>(Number(range ?? 3))

	const [latitude, setLatitude] = React.useState<number | null>(null)
	const [longitude, setLongitude] = React.useState<number | null>(null)
	const [locationName, setLocationName] = React.useState<string | null>(null)
	const [locationError, setLocationError] = React.useState<boolean>(false)

	React.useEffect(() => {
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

		}

		getLocation()
	}, [])

    const [nearLibraryList, setNearLibraryList] = React.useState<null | LibraryType[] | undefined>(null)
	React.useEffect(() => {
		if (latitude !== null && latitude !== undefined && longitude !== null && longitude !== undefined) {
			booksitoutServer
				.get(`v5/library/available-library/by-radius?lat=${latitude}&long=${longitude}&radius=${currentRange * 1000}&size=20`)
				.then((res) => {
					if (nearLibraryList?.length ?? 0 !== res.data.content.length) {
						if (res.data.content.length - (nearLibraryList?.length ?? 0) > 0) {
							toast.success(
								`도서관 ${res.data.content.length - (nearLibraryList?.length ?? 0)}곳을 ${
									(nearLibraryList?.length ?? 0) === 0 ? '' : '더 '
								}찾았어요`
							)
						} else if (res.data.content.length - (nearLibraryList?.length ?? 0) < 0) {
							toast.success(`도서관 ${(nearLibraryList?.length ?? 0) - res.data.content.length }곳이 없어졌어요`)
						} else {
							toast.success('새로 찾은 도서관은 없어요')
						}
					}

					setNearLibraryList(res.data.content)
				})
				.catch(() => setNearLibraryList(undefined))
		}
	}, [latitude, longitude, currentRange])

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
		<div className='container-xl'>
			<ReloadIcon
				className='text-book clickable d-md-none'
				onClick={refreshLocation}
				style={{ fontSize: '40px', position: 'absolute', right: '2.5%', top: '80px' }}
			/>

			<div className='row justify-content-end mb-3'>
				<div className='col-12 col-md-10'>
					<CardTitle icon={<LocationIcon />} title='내 주변 도서관' subTitle={locationName ?? '?'} />
				</div>

				<div className='col-6 col-md-2 pt-md-3'>
					<Form>
						<Form.Select
							onChange={(e) => {
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
				<Error message='서버에 오류가 났어요' move={0} />
			) : nearLibraryList == null ? (
				Array.from({ length: 6 }).map(() => {
					return <LibraryCardLoading />
				})
			) : nearLibraryList.length === 0 ? (
				<NoContent message={`${currentRange}km 내에 도서관이 없어요`} textSize={2} iconSize={7} move={0} />
			) : (
				nearLibraryList.map((library) => {
					return <LibraryCard library={library} />
				})
			)}
		</div>
	)
}

export default LibraryNearRoute