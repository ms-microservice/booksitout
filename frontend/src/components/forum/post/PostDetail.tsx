import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Error from '../../common/Error'
import Loading from '../../common/Loading'

import { Post } from './Post'
import Preparing from '../../common/Preparing'

const PostDetail = () => {
    const { postId } = useParams()
    const [post, setPost] = useState<Post | null>(null)
    const [commentList, setCommentList] = useState()

    const [initialFetch, setInitialFetch] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setInitialFetch(false)
        }, 500)

    }, [])

    if (initialFetch) return <></>
    if (loading) return <Loading/>
    if (post == null) return <Error />

    return (
		<div>
			<Preparing message='포스트 자세히 보기는 아직 준비 중이에요' />
		</div>
	)
}

export default PostDetail