package com.jinkyumpark.search.newBook

import com.jinkyumpark.search.apiResponse.aladin.ApiAladinResponse
import com.jinkyumpark.search.common.SearchResult
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class NewService(
    val webClient: WebClient,

    @Value("\${search.aladin.api-key}")
    val aladinApiKey: String
) {

    @Cacheable(value = ["new-aladin"], key = "#query.toLowerCase().replaceAll(' ', '')")
    fun getBookByQueryFromAladin(query: String, size: Int): List<SearchResult> {
        val url = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?TTBKey=$aladinApiKey&Query=$query&Output=JS&version=20131101&MaxResults=$size"

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

}