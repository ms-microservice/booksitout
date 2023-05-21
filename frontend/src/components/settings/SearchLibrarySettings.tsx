import LibrarySearchMethodSettings from './library-settings/LibrarySearchMethodSettings'
import LibraryRegionSettingsCard from './library-settings/LibraryRegionSettingsCard'
import LibrarySearchSpecificCard from './library-settings/LibrarySearchSettingsCard'

const SearchLibrarySettings = () => {
	return (
		<div className='container-xl'>
			<LibrarySearchMethodSettings />

			<LibraryRegionSettingsCard />

			<LibrarySearchSpecificCard />
		</div>
	)
}

export default SearchLibrarySettings
