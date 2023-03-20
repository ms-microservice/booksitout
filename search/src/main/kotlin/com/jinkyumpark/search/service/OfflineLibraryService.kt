package com.jinkyumpark.search.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.jinkyumpark.search.apiResponse.availableLibrary.ApiAvailableLibraryLibsLib
import com.jinkyumpark.search.apiResponse.availableLibrary.ApiAvailableLibraryResponse
import com.jinkyumpark.search.response.library.AvailableLibrary
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class OfflineLibraryService(
    @Value("\${search.data4library.api-key}")
    private val data4LibraryApiKey: String,

    val webClient: WebClient,
    val objectMapper: ObjectMapper,
) {
    fun getAvailableLibraryByRegion(isbn: String, regionCode: Int, regionDetailCode: Int?): List<AvailableLibrary> {
        val url =
            "http://data4library.kr/api/libSrchByBook?authKey=$data4LibraryApiKey&isbn=$isbn&region=$regionCode&format=JS&${"dtl_region=$regionDetailCode"}"

        val responseString: String = webClient
            .get()
            .uri(url)
            .retrieve()
            .bodyToMono(String::class.java)
            .block() ?: return listOf()

        val response: ApiAvailableLibraryResponse =
            objectMapper.readValue(responseString, ApiAvailableLibraryResponse::class.java)

        return response.response.libs
            .map(ApiAvailableLibraryLibsLib::lib)
            .map {
                AvailableLibrary(
                    code = it.libCode,
                    name = it.libName,
                    address = it.address,
                    libraryLink = it.homepage,
                )
            }
    }
}