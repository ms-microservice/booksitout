package com.jinkyumpark.search.general

import com.jinkyumpark.search.apiResponse.aladin.ApiAladinResponse
import com.jinkyumpark.search.apiResponse.google.ApiGoogleImageSearchResponse
import com.jinkyumpark.search.apiResponse.naver.ApiNaverSearchResponse
import com.jinkyumpark.search.common.SearchResult
import com.jinkyumpark.search.general.response.AddBookResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class GeneralService(
    val webClient: WebClient,

    @Value("\${search.aladin.secret}") val aladinApiKey: String,
    @Value("\${search.google.url}") val googleUrl: String,
    @Value("\${search.google.secret}") val googleSecret: String,
    @Value("\${search.google.cx}") val googleCx: String,
    @Value("\${search.naver.url}") val naverUrl: String,
    @Value("\${search.naver.clientId}") val naverClientId: String,
    @Value("\${search.naver.secret}") val naverSecret: String,
) {

    @Cacheable(value = ["new-aladin"], key = "#query.toLowerCase().replaceAll(' ', '')")
    fun getBookByQueryFromAladin(query: String, size: Int): List<SearchResult> {
        val url =
            "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?TTBKey=$aladinApiKey&Query=$query&Output=JS&version=20131101&MaxResults=$size"

        val response: ApiAladinResponse = webClient
            .get()
            .uri(url)
            .retrieve()
            .bodyToMono(ApiAladinResponse::class.java)
            .block() ?: return listOf()

        return response.item?.map { aladin ->
            SearchResult(
                title = aladin.title ?: "",
                author = aladin.author,
                link = aladin.link,
                cover = aladin.cover,
                isbn = aladin.isbn13,
                searchProvider = null
            )
        } ?: listOf()
    }

    @Cacheable(value = ["new-naver"], key = "#query.toLowerCase().replaceAll(' ', '')")
    fun getBookByQueryFromNaver(query: String): List<AddBookResponse> {
        val url = "$naverUrl?query=$query&display=8"

        val response: ApiNaverSearchResponse = webClient
            .get()
            .uri(url)
            .header("X-Naver-Client-Id", naverClientId)
            .header("X-Naver-Client-Secret", naverSecret)
            .retrieve()
            .bodyToMono(ApiNaverSearchResponse::class.java)
            .block() ?: return listOf()

        return response
            .items
            .map {
                AddBookResponse(
                    title = it.title,
                    author = it.author,
                    cover = it.image,
                    isbn = it.isbn,
                    link = it.link,
                )
            }
    }

    @Cacheable(value = ["google-image"], key = "#title.toLowerCase().replace(' ', '')")
    fun getBookImageFromGoogle(title: String, author: String): List<String> {
        val titleAuthorQuery = "$title - $author".replace(" ".toRegex(), "%20")
        val titleAuthorUrl = "$googleUrl?key=$googleSecret&cx=$googleCx&q=$titleAuthorQuery&searchType=image&num=8"
        println(titleAuthorUrl)
        val titleAuthorResponse = webClient
            .get()
            .uri(titleAuthorUrl)
            .retrieve()
            .bodyToMono(ApiGoogleImageSearchResponse::class.java)
            .block()

        val titleAuthorResult = titleAuthorResponse
            ?.items
            ?.map { it.link }
            ?: listOf()

        if (titleAuthorResult.isNotEmpty()) return titleAuthorResult.filterNotNull()
        if (author == "") return listOf()

        val titleUrl = "$googleUrl?key=$googleSecret&cx=$googleCx&q=$title&searchType=image&num=8"
        println(titleUrl)
        val titleResponse = webClient
            .get()
            .uri(titleUrl)
            .retrieve()
            .bodyToMono(ApiGoogleImageSearchResponse::class.java)
            .block()

        return titleResponse
            ?.items?.mapNotNull { it.link }
            ?: listOf()
    }
}   