import React from 'react'
import { useLoaderData } from 'react-router-dom'
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
	const name = params.name

    const fetchRegion = booksitoutServer.get(`v5/library/region/by-english-name?english-name=${name}`).then((res) => res.data)
    const fetchLibraryList = booksitoutServer.get(`v5/library/available-library/by-region/region-detail-english-name/${name}`).then((res) => res.data)

    const [region, libraryList] = await Promise.all([fetchRegion, fetchLibraryList])

    return {
		region: region,
		pagedLibrary: libraryList,
	}
}

const LibraryRegionDetail = () => {
    const { region, pagedLibrary} = useLoaderData() as LoaderData

    return (
		<div className='container-xl'>
			<LibraryRegionSummaryCard region={region} pagedLibrary={pagedLibrary} />
			<div className='mb-3' />

			<RegionLibraryListCard pagedLibrary={pagedLibrary} />
			<div className='mb-3' />
		</div>
	)
}

export default LibraryRegionDetail