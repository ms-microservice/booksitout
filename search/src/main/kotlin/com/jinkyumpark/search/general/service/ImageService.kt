package com.jinkyumpark.search.general.service

import com.jinkyumpark.search.apiResponse.google.ApiGoogleImageSearchResponse
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class ImageService(
    val webClient: WebClient,

    @Value("\${search.google.url}") val googleUrl: String,
    @Value("\${search.google.secret}") val googleSecret: String,
    @Value("\${search.google.cx}") val googleCx: String,
) {

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