import React from "react";
import toast from "react-hot-toast";

import '../../../resources/css/button.css'
import '../../../resources/css/library-search.css'
import { LibraryType } from "../../../types/LibraryType";

import SettingsCard from "../SettingsCard";
import LibrarySearchSettingsAddedLibraryCard from "./AddedLibraryCard";
import LibrarySearchSettingsDetailModal from "./LibrarySearchSettingsDetailModal";
import LibrarySearchSettingsSearchCard from "./LibrarySearchSettingsSearchCard";

const LibrarySearchSpecificCard = () => {
	const [addedLibrary, setAddedLibrary] = React.useState<LibraryType[]>([])
	const [selectedLibrary, setSelectedLibrary] = React.useState<LibraryType | null>(null)
	const [modalOpen, setModalOpen] = React.useState<Boolean>(false)
  const [searchResult, setSearchResult] = React.useState<LibraryType[]>([])

  React.useEffect(() => {
		// TODO : initial added library fetch
  }, [])

	const addLibrary = () => {
		setModalOpen(false)

		// TODO : POST

		toast.success(`${selectedLibrary?.name.replaceAll(' ', '')}을 검색범위에 추가했어요`)
		setAddedLibrary([...addedLibrary, selectedLibrary!!])
		setSearchResult(searchResult.map((r) => {
			if (r.name === selectedLibrary?.name) return { ...r, added: true }
			else return r
		}))
	}

  const removeLibrary = (library: LibraryType) => {
		const confirm = window.confirm(`${library.name.replaceAll(' ', '')}을 검색범위에서 삭제할까요?`)
		if (!confirm) return

		setAddedLibrary(addedLibrary.filter((l) => l.name !== library.name))
		// setSearchResult(
		// 	searchResult.map((r) => {
		// 		if (r.name === library.name) return { ...r, added: false }
		// 		else return r
		// 	})
		// )

		toast.error(<>{library.name.replaceAll(' ', '')}은 이제 검색하지 않을게요</>)
  }

    return (
		<>
			<LibrarySearchSettingsDetailModal show={modalOpen} setShow={setModalOpen} library={selectedLibrary} handleAddLibrary={addLibrary} />

			<SettingsCard
				title='도서관 직접 지정해서 검색하기'
				content={
					<>
						<LibrarySearchSettingsAddedLibraryCard addedLibrary={addedLibrary} removeLibrary={removeLibrary} />

						<LibrarySearchSettingsSearchCard
							setShow={setModalOpen}
							setSelectedLibrary={setSelectedLibrary}
							searchResult={searchResult}
							setSearchResult={setSearchResult}
						/>
					</>
				}
			/>
		</>
	)
}

export default LibrarySearchSpecificCard
