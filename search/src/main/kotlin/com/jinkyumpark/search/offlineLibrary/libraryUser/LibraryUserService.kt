package com.jinkyumpark.search.offlineLibrary.libraryUser

import org.springframework.stereotype.Service

@Service
class LibraryUserService(
    private val libraryUserRepository: LibraryUserRepository
) {

    fun getLibrarySearchRange(appUserId: Long): List<LibraryUser> {
        return libraryUserRepository.findAllByAppUserId(appUserId)
    }

    fun addLibrarySearchRange(libraryId: Long, appUserId: Long) {
        val libraryUser = LibraryUser(id = libraryId, appUserId = appUserId)

        libraryUserRepository.save(libraryUser)
    }

    fun deleteLibrarySearchRange(libraryId: Long, appUserId: Long) {
        libraryUserRepository.deleteByIdAndAppUserId(libraryId, appUserId)
    }

}