import search from '../../../functions/search'

const LibraryLabel = () => {
	return (
		<div className='text-secondary'>
			{search.local.settings.library.isConfigured() &&
				`${search.local.settings.library.display.region()} ${search.local.settings.library.display.regionDetail()}`}
		</div>
	)
}

export default LibraryLabel
