package com.jinkyumpark.search.bookSearch

import com.jinkyumpark.search.apiResponse.aladin.ApiAladinResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class SearchBookService(
    val webClient: WebClient,

    @Value("\${search.aladin.api-key}")
    val aladinApiKey: String
) {

    fun getBookByQueryFromAladin(query: String, size: Int): List<BookSearchResult> {
        val url = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?TTBKey=$aladinApiKey&Query=$query&Output=JS&version=20131101&MaxResults=$size"

        val response: ApiAladinResponse = webClient
            .get()
            .uri(url)
            .retrieve()
            .bodyToMono(ApiAladinResponse::class.java)
            .block() ?: return listOf()

        return response.item?.map { aladin ->
            BookSearchResult(
                title = aladin.title ?: "",
                author = aladin.author,
                link = aladin.link,
                cover = aladin.cover,
                isbn = aladin.isbn13
            )
        } ?: listOf()
    }

}