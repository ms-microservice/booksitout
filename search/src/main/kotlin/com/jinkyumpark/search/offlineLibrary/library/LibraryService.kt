package com.jinkyumpark.search.offlineLibrary.library

import org.springframework.stereotype.Service

@Service
class LibraryService(
    val libraryRepository: LibraryRepository,
) {

    fun getLibraryByEnglishName(englishName: String): Library? {
        return libraryRepository.findByEnglishName(englishName)
    }

    fun getLibraryByNameOrAddress(query: String): List<Library> {
        return libraryRepository.findAllByNameAndAddressContains(query)
    }

}