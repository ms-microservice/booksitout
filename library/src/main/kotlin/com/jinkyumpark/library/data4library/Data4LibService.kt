package com.jinkyumpark.library.data4library

import com.fasterxml.jackson.databind.ObjectMapper
import com.jinkyumpark.library.data4library.response.ApiData4LibraryAvailableLibraryResponse
import com.jinkyumpark.library.data4library.response.ApiData4LibraryAvailableLibraryResponseLibraryLib
import com.jinkyumpark.library.library.Library
import com.jinkyumpark.library.region.regionDetail.RegionDetail
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class Data4LibService(
    val webClient: WebClient,
    val objectMapper: ObjectMapper,

    @Value("\${api.secret.data4lib}")
    private val data4LibSecret: String,
) {

    fun getAvailableLibrary(page: Int = 1, size: Int = 10): ApiData4LibraryAvailableLibraryResponse? {
        val uri = "http://data4library.kr/api/libSrch?format=JS&authKey=$data4LibSecret&pageNo=$page&pageSize=$size"

        val responseString = webClient
            .get()
            .uri(uri)
            .retrieve()
            .bodyToMono(String::class.java)
            .block()

        return objectMapper.readValue(responseString, ApiData4LibraryAvailableLibraryResponse::class.java)
    }

    fun getAvailableLibraryTotalPages(size: Int): Int {
        return getAvailableLibrary(1, size)
            ?.response
            ?.numFound!!
            .let { it / size }
    }

    fun availableLibraryToEntity(availableLibrary: ApiData4LibraryAvailableLibraryResponseLibraryLib, regionDetailId: Long): Library {
        return Library(
            availableLibrary.libName,

            availableLibrary.address,
            availableLibrary.latitude.toDouble(),
            availableLibrary.longitude.toDouble(),
            RegionDetail(regionDetailId),

            availableLibrary.tel,
            availableLibrary.homepage,
            availableLibrary.operatingTime,
            availableLibrary.closed,

            if ((availableLibrary.BookCount?.replace("[^0-9]".toRegex(), "") ?: "") == "") 0
            else availableLibrary.BookCount?.replace("[^0-9]".toRegex(), "")?.toInt(),

            if (availableLibrary.libCode.replace("[^0-9]".toRegex(), "") == "") 0
            else availableLibrary.libCode.replace("[^0-9]".toRegex(), "").toInt(),
        )
    }

}