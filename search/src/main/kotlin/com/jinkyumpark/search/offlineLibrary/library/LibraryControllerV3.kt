package com.jinkyumpark.search.offlineLibrary.library

import com.jinkyumpark.search.offlineLibrary.library.request.LibrarySearchRangeAddRequest
import com.jinkyumpark.search.offlineLibrary.response.AvailableLibraryResponse
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("v3/search/library")
class LibraryControllerV3(
    val libraryService: LibraryService,
) {

    @GetMapping("available-library/{query}")
    fun getAvailableLibrary(
        @PathVariable query: String,
    ): List<AvailableLibraryResponse> {
        return libraryService.getLibraryByNameOrAddress(query)
            .map {
                AvailableLibraryResponse(
                    id = it.id ?: 0L,
                    name = it.koreanName ?: "",
                    icon = it.city?.logo ?: "",
                    link = it.link,
                    address = it.address ?: "",
                )
            }
    }

    @PostMapping("settings")
    fun addLibraryToSearchRange(@RequestBody libraryAddRequest: LibrarySearchRangeAddRequest) {

    }

    @DeleteMapping("settings/{libraryId}")
    fun deleteLibraryFromSearchRange(@PathVariable libraryId: Long) {

    }

    @GetMapping("settings/method")
    fun getLibrarySearchMethod() {

    }

    @PutMapping("settings/method")
    fun changeLibrarySearchMethod() {

    }

}