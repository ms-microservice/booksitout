package com.jinkyumpark.search.general.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.jinkyumpark.search.apiResponse.aladin.ApiAladinResponse
import com.jinkyumpark.search.apiResponse.data4library.ApiData4LibraryBookDetailResponse
import com.jinkyumpark.search.apiResponse.naver.ApiNaverSearchResponse
import com.jinkyumpark.search.common.SearchResult
import com.jinkyumpark.search.general.response.AddBookResponse
import com.jinkyumpark.search.general.response.BookResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class BookInfoService(
    val webClient: WebClient,
    val objectMapper: ObjectMapper,

    @Value("\${search.naver.url}") val naverUrl: String,
    @Value("\${api.search.url.naver.book-detail}") val naverBookDetailUrl: String,
    @Value("\${search.naver.clientId}") val naverClientId: String,
    @Value("\${search.naver.secret}") val naverSecret: String,
    @Value("\${search.data4library.secret}") private val data4LibrarySecret: String,
    @Value("\${search.aladin.secret}") val aladinApiKey: String,

) {

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
                    description = it.description,
                    publicationYear = null,
                    page = null,
                    language = null,
                    category = null,
                )
            }
    }

    fun getBookByIsbnFromNaver(isbn: String): AddBookResponse? {
        val url = "$naverBookDetailUrl?d_isbn=$isbn&display=1"

        val response: ApiNaverSearchResponse = webClient
            .get()
            .uri(url)
            .header("X-Naver-Client-Id", naverClientId)
            .header("X-Naver-Client-Secret", naverSecret)
            .retrieve()
            .bodyToMono(ApiNaverSearchResponse::class.java)
            .block() ?: return null

        if (response.items.isEmpty()) return null

        return response
            .items
            .first()
            .let {
                AddBookResponse(
                    title = it.title,
                    author = it.author,
                    cover = it.image,
                    isbn = it.isbn,
                    link = it.link,
                    description = it.description,
                    publicationYear = null,
                    page = null,
                    language = null,
                    category = null,
                )
            }
    }

    @Cacheable(value = ["new-aladin"], key = "#query.toLowerCase().replaceAll(' ', '')")
    fun getBookInfoByQueryFromAladin(query: String, size: Int): List<SearchResult> {
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

    fun getBookInfoFromData4library(isbn: Long): BookResponse? {
        val uri = """
            http://data4library.kr/api/srchDtlList?
            authKey=$data4LibrarySecret&
            isbn13=$isbn&
            format=js
        """.trimIndent().replace("\n".toRegex(), "")

        val responseString = webClient
            .get()
            .uri(uri)
            .retrieve()
            .bodyToMono(String::class.java)
            .block() ?: return null

        val response = objectMapper.readValue(responseString, ApiData4LibraryBookDetailResponse::class.java)

        return response.toBookResponse()
    }

}