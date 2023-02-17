package com.jinkyumpark.search.library

import com.jinkyumpark.search.library.response.OnlineLibraryResponse

interface OnlineLibraryService {

    fun getSearchResult(): List<OnlineLibraryResponse>

}