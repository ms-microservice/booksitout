package com.jinkyumpark.search.offlineLibrary.library

import com.jinkyumpark.search.offlineLibrary.model.Library
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface LibraryRepository : JpaRepository<Library, Long> {

    fun findByEnglishName(englishName: String): Library?

    @Query(
        """
        select l from Library l 
        where 
            l.koreanName like %:query% OR 
            l.englishName like %:query% OR 
            l.address like %:query%
    """
    )
    fun findAllByNameAndAddressContains(query: String): List<Library>
}