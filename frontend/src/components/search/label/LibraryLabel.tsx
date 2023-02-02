import search from '../../../functions/search'

const LibraryLabel = () => {
	return (
		<div className='text-secondary'>
			{search.settings.library.isConfigured() &&
				`${search.settings.library.display.region()} ${search.settings.library.display.regionDetail()}`}
		</div>
	)
}

export default LibraryLabel
