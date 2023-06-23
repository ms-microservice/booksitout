import LibrarySearchMethodSettings from './library-settings/LibrarySearchMethodSettings'
import LibraryRegionSettingsCard from './library-settings/LibraryRegionSettingsCard'
import LibrarySearchSpecificCard from './library-settings/LibrarySearchSettingsCard'

const SearchLibrarySettings = () => {
	return (
		<div className='container-xl' style={{ overflowX: 'hidden' }}>
			<LibrarySearchMethodSettings />

			<LibraryRegionSettingsCard />

			<LibrarySearchSpecificCard />
		</div>
	)
}

export default SearchLibrarySettings
