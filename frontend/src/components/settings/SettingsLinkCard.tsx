import SettingsCard from "./SettingsCard"

import { BsFillArrowRightCircleFill as RightArrowIcon } from 'react-icons/bs'

const SettingsLinkCard = ({ title, contentList, link }) => {
	return (
		<a href={link} className='text-decoration-none text-black'>
			<SettingsCard
				title={title}
				content={
					<div className='row row-eq-height h-100'>
						<div className='col-10'>
							<div className='ms-4 text-secondary'>
								{contentList.map((content) => (
									<p className='mb-2'>{content}</p>
								))}
							</div>
						</div>

						<div className='mt-5 col-2 d-flex justify-content-end align-items-center'>
							<RightArrowIcon className='text-book' size={30} />
						</div>
					</div>
				}
			/>
		</a>
	)
}

export default SettingsLinkCard