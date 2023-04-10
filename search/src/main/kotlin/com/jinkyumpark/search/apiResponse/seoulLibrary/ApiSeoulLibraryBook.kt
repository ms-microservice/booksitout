package com.jinkyumpark.search.apiResponse.seoulLibrary

import com.jinkyumpark.search.common.SearchProvider
import com.jinkyumpark.search.common.SearchResult

data class ApiSeoulLibraryBook(
    val contentsKey: String,
    val title: String,
    val author: String,
    val publisher: String,
    val publishDate: String,
    val contentsType: String,
    val contentsTypeDesc: String,
    val loanCnt: String,
    val ownerCode: String,
    val coverUrl: String,
    val coverMSizeUrl: String,
    val coverSSizeUrl: String,
    val contentsInfo: String,
    val recommendCnt: String,
    val reserveCnt: String,
    val reviewRate: String,
    val likeYn: String,
    val isbn: String,
    val currentLoanCount: Int,
    val currentResvCount: Int,
    val reviewCount: Int,
    val likeCount: Int,
    val avgrate: Double,
) {

    fun toOnlineLibraryResponse(): SearchResult {
        return SearchResult(
            title = title,
            author = author,
            cover = coverUrl,
            link = "https://elib.seoul.go.kr/contents/detail.do?no=$contentsKey",
            loanPossible = currentLoanCount < 5,
            reservationPossible = currentResvCount < 5,
            searchProvider = SearchProvider.SEOUL_LIBRARY,
        )
    }

}
