import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useParams } from "react-router-dom"

import parse from 'html-react-parser'

import Tip from "./Tip"
import TipsTimeIcon from "./TipsTimeIcon"

import Loading from "../../common/Loading"
import Error from '../../common/Error'
import urls from "../../../settings/urls"
import axios from "axios"

const TipsDetail = () => {
    const { id } = useParams()

    const [initialFetch, setInitialFetch] = useState(true)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

    const [tip, setTip] = useState<Tip | null>(null)
    useEffect(() => {
        axios
			.get(`${urls.api.base}/v4/forum/tips/${id}`)
			.then((res) => {
				if (!res.status.toString().startsWith('2')) {
					throw Error()
				}

				setTip(res.data)
			})
			.catch(() => {
				setError(true)
			})
			.finally(() => {
				setInitialFetch(false)
				setLoading(false)
			})
    }, [])

    if (initialFetch) return <></>
    if (loading) return <Loading/>
    if (error) return <Error />

    return (
		<div className='container-xl'>
			<Card style={{ minHeight: '200px' }} className='mb-4'>
				<Card.Body>
					<div className='row'>
						<div className='col-12 col-md-10'>
							<h2>{tip?.title}</h2>
						</div>

						<div className='col-12 col-md-2'>
							<TipsTimeIcon time={tip?.estimatedReadTime} size='h4' />

							<h6 className='text-end text-secondary'>{`
                            ${tip?.createdDate?.split('-')[0].slice(2)}년 
                            ${tip?.createdDate?.split('-')[1]}월`}</h6>
						</div>
					</div>

					<p className='text-secondary'>{tip?.summary}</p>
				</Card.Body>
			</Card>

			<Card style={{ minHeight: '500px' }}>
				<Card.Body>
					<p>{parse(tip?.content ?? '')}</p>
				</Card.Body>
			</Card>
		</div>
	)
}

export default TipsDetail