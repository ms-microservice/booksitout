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

    @Value("\${search.aladin.api-key}") val aladinApiKey: String,
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

    @Cacheable(value = ["google-image"], key = "#query.toLowerCase().replace(' ', '')")
    fun getBookImageFromGoogle(query: String): List<String> {
        val url = "$googleUrl?key=$googleSecret&cx=$googleCx&q=$query&searchType=image&num=8"

        val response = webClient
            .get()
            .uri(url)
            .retrieve()
            .bodyToMono(ApiGoogleImageSearchResponse::class.java)
            .block()

        return response
            ?.items
            ?.map { it.link }
            ?: listOf()
    }
}