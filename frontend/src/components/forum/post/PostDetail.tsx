import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Error from '../../common/Error'
import Loading from '../../common/Loading'

import { Post } from './Post'

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

    return <div>PostDetail</div>
}

export default PostDetail