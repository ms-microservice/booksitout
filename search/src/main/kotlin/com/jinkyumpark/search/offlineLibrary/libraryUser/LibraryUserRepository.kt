package com.jinkyumpark.search.offlineLibrary.libraryUser

import org.springframework.data.jpa.repository.JpaRepository

interface LibraryUserRepository: JpaRepository<LibraryUser, Long> {

    fun findAllByAppUserId(appUserId: Long): List<LibraryUser>

    fun deleteByIdAndAppUserId(id: Long, appUserId: Long): Long

}