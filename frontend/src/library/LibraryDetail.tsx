import React from 'react'
import { booksitoutServer } from '../functions/axios'
import { useLoaderData } from 'react-router-dom'
import { LibraryType } from './LibraryType'
import { Card } from 'react-bootstrap'

import {  BsGeoAltFill as LocationIcon, BsBrowserChrome as HomePageIcon, BsBookHalf  as BookIcon, BsAlarmFill as TimeIcon } from 'react-icons/bs'
import { GiPhone as PhoneIcon } from 'react-icons/gi'
import utils from '../functions/utils'
import LibraryTextWithIcon from './LibraryTextWithIcon'

export async function loader({ params }) {
	const id = params.id

	return booksitoutServer
		.get(`/v5/library/available-library/${id}`)
		.then((res) => res.data)
		.catch((e) => {
			throw e
    })
}

const LibraryDetail = () => {
    const library = useLoaderData() as LibraryType
    document.title = `${library.name} | 책잇아웃`

    const mapElement = React.useRef(null);
    React.useEffect(() => {
		const { naver } = window
		if (!mapElement.current || !naver) return

		const location = new naver.maps.LatLng(library.location.latitude, library.location.longitude)
		const mapOptions: naver.maps.MapOptions = {
			center: location,
			zoom: 16,
			zoomControl: true,
			zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
		}

		const map = new naver.maps.Map(mapElement.current, mapOptions)
		new naver.maps.Marker({ position: location, map })
	}, [library.location.latitude, library.location.longitude])

    return (
		<div className='container-xl'>
			<Card className='mb-3'>
				<Card.Body>
					<div className='row justify-content-end'>
						<div className='col-12 col-md-9'>
							<h2>{library.name}</h2>
						</div>

						<div className='col-8 col-md-3 mb-4 mb-md-0 mt-2 mt-md-0'>
							<Card>
								<Card.Body className='d-flex align-items-center'>
									<img src={library.location.logo} alt='' style={{ height: '40px' }} className='rounded' />
									<h5 className='ms-2 w-100 text-center mb-0'>{library.location.name}</h5>
								</Card.Body>
							</Card>
						</div>
					</div>

					<div className='ms-md-5'>
						<LibraryTextWithIcon icon={<LocationIcon />} text={library.location.address} />
						<LibraryTextWithIcon icon={<PhoneIcon />} text={library.phone} />
						<LibraryTextWithIcon
							icon={<HomePageIcon />}
							text={
								<a href={library.homepage} target='_blank' rel='noreferrer' className='text-secondary'>
									{library.homepage?.substring(library.homepage.indexOf('://') + 3)}
								</a>
							}
						/>

						<LibraryTextWithIcon icon={<BookIcon />} text={`${utils.insertCommas(library.bookCount)} 권` ?? '?'} />
						<LibraryTextWithIcon icon={<TimeIcon />} text={`휴무) ${library.openDay}`} />
					</div>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					<div ref={mapElement} style={{ width: '100%', height: '400px' }} className='rounded' />
				</Card.Body>
			</Card>
		</div>
	)
}

export default LibraryDetail