package com.jinkyumpark.library.data4library

import com.jinkyumpark.library.data4library.response.ApiData4LibraryAvailableLibraryResponse
import com.jinkyumpark.library.library.Library
import com.jinkyumpark.library.region.RegionDetail
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class Data4LibService(
    val webClient: WebClient,

    @Value("\${api.secret.data4lib}")
    val data4LibSecret: String,
) {

    fun getAvailableLibrary(page: Int = 1, size: Int = 10): ApiData4LibraryAvailableLibraryResponse? {
        val uri = "http://data4library.kr/api/libSrch?format=JS&authKey=$data4LibSecret&pageNo=$page&size=$size"

        return webClient
            .get()
            .uri(uri)
            .retrieve()
            .bodyToMono(ApiData4LibraryAvailableLibraryResponse::class.java)
            .block()
    }

    fun availableLibraryToEntity(availableLibrary: ApiData4LibraryAvailableLibraryResponse, regionDetailId: Long): List<Library> {
        return availableLibrary
            .response
            .libs
            .map {
                Library.builder()
                    .name(it.lib.libName)

                    .address(it.lib.address)
                    .latitude(it.lib.latitude.toDouble())
                    .longitude(it.lib.longitude.toDouble())
                    .regionDetail(RegionDetail.builder().regionDetailId(regionDetailId).build())

                    .phone(it.lib.tel.toInt())
                    .homePage(it.lib.homepage)
                    .openHour(it.lib.operatingTime)
                    .openDay(it.lib.closed)
                    .bookCount(it.lib.BookCount.toInt())
                    .data4LibCode(it.lib.libCode.toInt())

                    .build()
            }
    }

}