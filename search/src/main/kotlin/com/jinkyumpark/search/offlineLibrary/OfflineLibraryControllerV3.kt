package com.jinkyumpark.search.offlineLibrary

import com.jinkyumpark.search.offlineLibrary.provider.Library
import com.jinkyumpark.search.offlineLibrary.response.OfflineLibraryBook
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("v3/search/library")
class OfflineLibraryControllerV3(
    val offlineLibraryService: OfflineLibraryService,
) {

    @GetMapping("{query}")
    fun getSearchResult(
        @PathVariable query: String,
        @RequestParam("library") libraryList: List<String>,
    ): List<OfflineLibraryBook> {
        return offlineLibraryService.getYeongdeungpoguResult(query, libraryList.map { Library.valueOf(it.uppercase()) } )
    }

}