package com.jinkyumpark.search.general.service

import com.jinkyumpark.search.apiResponse.aladin.bestSeller.ApiAladinBestSellerResponse
import com.jinkyumpark.search.general.response.BestSellerBookResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class PopularBookService(
    @Value("\${search.aladin.secret}") private val aladinSecret: String,

    val webClient: WebClient,
) {

    fun getBestSellerFromAladin(): List<BestSellerBookResponse> {
        val uri = "http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=$aladinSecret&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101"

        val response = webClient
            .get()
            .uri(uri)
            .retrieve()
            .bodyToMono(ApiAladinBestSellerResponse::class.java)
            .block() ?: return listOf()

        return response
            .item
            .mapIndexed { i, it ->
                BestSellerBookResponse(
                    id = i + 1,
                    title = it.title,
                    author = it.author,
                    cover = it.cover,
                    isbn = it.isbn13.toLong()
                )
            }
    }

}