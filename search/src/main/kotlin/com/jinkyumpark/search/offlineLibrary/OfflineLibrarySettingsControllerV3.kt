package com.jinkyumpark.search.offlineLibrary

import com.jinkyumpark.search.offlineLibrary.library.request.LibrarySearchRangeAddRequest
import com.jinkyumpark.search.offlineLibrary.libraryUser.LibraryUserService
import com.jinkyumpark.search.offlineLibrary.response.AvailableLibraryResponse
import com.jinkyumpark.search.common.security.LoginUser
import com.jinkyumpark.search.common.security.User
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("v3/search/library/settings")
class OfflineLibrarySettingsControllerV3(
    val libraryUserService: LibraryUserService,
) {

    @GetMapping("my-range")
    fun getLibrarySearchRange(@LoginUser user: User): List<AvailableLibraryResponse> {
        return libraryUserService
            .getLibrarySearchRange(user.id)
            .map {
                AvailableLibraryResponse(
                    id = it.id ?: 0L,
                    name = it.library?.koreanName ?: "?",
                    icon = it.library?.city?.logo ?: "",
                    link = it.library?.link ?: "",
                    address = it.library?.address ?: "?",
                    added = true
                )
            }
    }

    @PostMapping
    fun addLibraryToSearchRange(
        @RequestBody libraryAddRequest: LibrarySearchRangeAddRequest,
        @LoginUser user: User
    ): ResponseEntity<String> {
        libraryUserService.addLibrarySearchRange(libraryAddRequest.id, user.id)

        return ResponseEntity(HttpStatus.CREATED)
    }

    @DeleteMapping("{libraryId}")
    fun deleteLibraryFromSearchRange(@PathVariable libraryId: Long, @LoginUser user: User): ResponseEntity<String> {
        libraryUserService.deleteLibrarySearchRange(libraryId, user.id)

        return ResponseEntity(HttpStatus.OK)
    }

}