import { Button } from "react-bootstrap"

const AllButton = ({url, label='전체보기', col='col-12 col-md-6'}) => {
    return (
		<div className='row justify-content-center mt-5 ms-0 me-0 mb-0'>
			<div className={col} style={{ position: 'absolute', bottom: '20px' }}>
				<a href={url}>
					<Button variant='outline-book' className='w-100'>
						{label}
					</Button>
				</a>
			</div>
		</div>
	)

}

export default AllButton