import React from 'react'
import { Card } from "react-bootstrap"
import PostListGroup from '../post/PostListGroup'
import AddButton from '../../common/AddButton'
import Error from '../../common/Error';
import AllButton from '../../common/AllButton'
import { PostType } from '../post/PostType'
import booksitoutIcon from '../../common/icons/booksitoutIcon';
import CardTitle from '../../common/CardTitle'
import styled from 'styled-components';
import PostListGroupLoading from '../post/PostListGroupLoading'
import { useMinLoading } from '../../common/useMinLoading'
import { booksitoutServer } from '../../functions/axios'

const CommunityRoutePostCard = () => {
	const [popularPost, loading, error] = useMinLoading<PostType[]>(() =>
		booksitoutServer.get('/v4/forum/post?sort=popular&size=8').then(res => res.data.content),
	)

    return (
		<PostCard>
			<AddButton size={30} color="book" top="15px" right="15px" url="/community/post/add" />

			<Card.Body>
				<PostCardContainer href="/community/post/all/popular">
					<CardTitle icon={<booksitoutIcon.popular />} title={'인기글'} />

					{loading ? (
						<PostListGroupLoading length={8} col1="col-12 col-md-6" col2="col-12 col-md-6" />
					) : error ? (
						<Error />
					) : (
						<PostListGroup postList={popularPost} col1="col-12 col-md-6" col2="col-12 col-md-6" />
					)}
				</PostCardContainer>

				<div className="pt-3" />
				<AllButton url="/community/post/all/popular" col="col-12 col-md-8" />
			</Card.Body>
		</PostCard>
	)	
}

const PostCard = styled(Card)`
	height: 100%;
	min-height: 750px;
	max-height: 750px;
`

const PostCardContainer = styled.a`
	&:hover {
		color: black;
	}
`

export default CommunityRoutePostCard