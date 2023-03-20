package com.jinkyumpark.search.apiResponse.seoulLibrary

import com.jinkyumpark.search.library.OnlineLibraryProvider
import com.jinkyumpark.search.library.response.OnlineLibraryResponse

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

    fun toOnlineLibraryResponse(): OnlineLibraryResponse {
        return OnlineLibraryResponse(
            title = title,
            author = author,
            cover = coverUrl,
            link = "https://elib.seoul.go.kr/contents/detail.do?no=$contentsKey",
            loanPossible = currentLoanCount < 5,
            reservationPossible = currentResvCount < 5,
            provider = OnlineLibraryProvider.SEOUL_LIBRARY,
        )
    }

}
