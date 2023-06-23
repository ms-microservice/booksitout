import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { LibraryType, LibraryTypeLocation } from '../LibraryType';
import { booksitoutServer } from '../../functions/axios';
import LibraryRegionSummaryCard from './LibraryRegionSummaryCard'
import RegionLibraryListCard from './RegionLibraryListCard';
import { PageType } from '../../types/PageType';

interface LoaderData {  
    region: LibraryTypeLocation;
    pagedLibrary: PageType<LibraryType[]>;
}

export async function loader({ params }) {
	const region = params.region
	const regionDetail = params.regionDetail

	if (regionDetail != null) {
		const fetchRegion = booksitoutServer.get(`v5/library/region/by-english-name?english-name=${regionDetail}`).then((res) => res.data)
		const fetchLibraryList = booksitoutServer
			.get(`v5/library/available-library/region?region=${region}&region-detail=${regionDetail}&size=30`)
			.then((res) => res.data)

		const [regionResponse, libraryList] = await Promise.all([fetchRegion, fetchLibraryList])

		return {
			region: regionResponse,
			pagedLibrary: libraryList,
		}
	}

	const fetchRegion = booksitoutServer.get(`v5/library/region/by-english-name?english-name=${region}`).then((res) => res.data)
	const fetchLibraryList = booksitoutServer
		.get(`v5/library/available-library/region?region=${region}&size=30`)
		.then((res) => res.data)

	const [regionResponse, libraryList] = await Promise.all([fetchRegion, fetchLibraryList])

	return {
		region: regionResponse,
		pagedLibrary: libraryList,
	}
}

const LibraryRegionRoute = () => {
	const { region, regionDetail } = useParams()
    const { region: regionInfo, pagedLibrary: initialPagedLibrary} = useLoaderData() as LoaderData

	const [libraryList, setLibraryList] = React.useState(initialPagedLibrary.content)
	const [pagedLibrary, setPagedLibrary] = React.useState(initialPagedLibrary)
	const [page, setPage] = React.useState<number>(2)

	const getNext = () => {
		booksitoutServer
			.get(
				regionDetail === null || regionDetail === undefined
					? `v5/library/available-library/region?region=${region}&size=30&page=${page}`
					: `v5/library/available-library/region?region=${region}&region-detail=${regionDetail}&size=30&page=${page}`,
			)
			.then(res => {
				setPagedLibrary(res.data)
				setLibraryList([...libraryList, ...res.data.content])
			})
			.then(() => setPage(page + 1))
	}

    return (
		<div className='container-xl'>
			<LibraryRegionSummaryCard region={regionInfo} pagedLibrary={initialPagedLibrary} />
			<div className='mb-3' />

			<RegionLibraryListCard pagedLibrary={pagedLibrary} libraryList={libraryList} getNext={getNext} />
			<div className='mb-3' />
		</div>
	)
}

export default LibraryRegionRoute