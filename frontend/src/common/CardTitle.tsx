import React, { ReactNode } from 'react'
import { Card, Placeholder } from 'react-bootstrap'
import styled from 'styled-components';

interface PropsType {
	icon: ReactNode
	title: any
	subTitle?: string | null
	textSize?: number
	iconSize?: number
	mb?: number
}

const CardTitle:React.FC<PropsType> = ({ icon, title, subTitle = '', textSize = 3, iconSize = 2, mb = 3 }) => {
	return (
		<div className={`d-flex flex-wrap mb-${mb} align-items-center`}>
			<h1 className={`me-2 text-book h${iconSize}`}>{icon}</h1>
			<div className={`h${textSize} m-0`}>{title}</div>

			{subTitle == null ? (
				<div className="col-12 col-md-6">
					<h6>
						<Placeholder as={Card.Text} animation="glow" className="mb-0">
							<SubtitleContainer>
								<Placeholder xs={5} />
							</SubtitleContainer>
						</Placeholder>
					</h6>
				</div>
			) : (
				subTitle !== '' && (
					<div className="col-12 col-md-6">
						<SubtitleContainer>{subTitle}</SubtitleContainer>
					</div>
				)
			)}
		</div>
	)
}

const SubtitleContainer = styled.h6.attrs({
	className: 'text-secondary ms-4 ms-md-2 mt-1 mt-md-3 mb-0 mb-md-1 clamp-1-line',
})``

export default CardTitle