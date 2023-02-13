package com.jinkyumpark.search.used

import com.jinkyumpark.search.used.apiResponse.ApiAladinItem
import com.jinkyumpark.search.used.apiResponse.ApiAladinResponse
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.parser.Parser
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class UsedService(
    @Value("\${search.aladin.api-key}")
    private val aladinApiKey: String,

    val webClient: WebClient
) {

    fun getAladinUsedBook(query: String?): List<ApiAladinItem> {
        val url = """
            http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?
            TTBKey=$aladinApiKey&Query=$query&
            SearchTarget=USED&outofStockfilter=1&Output=JS&OptResult=usedList&version=20131101
        """.trimIndent()

        val response: ApiAladinResponse = webClient
            .get()
            .uri(url)
            .retrieve()
            .bodyToMono(ApiAladinResponse::class.java)
            .block() ?: return listOf()

        return response.item ?: listOf()
    }

    fun getKyoboOnlineUsedBook(query: String): List<UsedSearchBook> {
        val url = String.format("https://search.kyobobook.co.kr/search?keyword=%s&gbCode=TOT&target=used", query)

        return listOf()
    }

    fun getInterparkOnlineUsedBook(query: String): List<UsedSearchBook> {
        return listOf()
    }

    fun getYes24OnlineUsedBook(query: String): List<UsedSearchBook> {
        return listOf()
    }

    fun getYes24OfflineUsedBook(query: String): List<UsedSearchBook> {
        val url = "http://www.yes24.com/product/search?domain=STORE&query=$query&page=1&size=10&dispNo1=001"

        val document: Document = Jsoup.connect(url).parser(Parser.htmlParser()).get()
        val listElements = document.getElementById("yesSchList")?.getElementsByTag("li") ?: return listOf()

        val resultList: MutableList<UsedSearchBook> = mutableListOf()
        for (listElement in listElements) {
            val title: String = listElement.getElementsByClass("gd_name").first()?.text() ?: continue
            val author: String =
                listElement.getElementsByClass("info_auth").first()?.getElementsByTag("a")?.first()?.text() ?: ""
            val cover: String = listElement.getElementsByTag("img").first()?.attr("data-original") ?: ""
            val minPrice: String =
                listElement.getElementsByClass("txt_num").first()?.text()?.replace(",", "")?.replace("원", "") ?: "0"
            val stockCount: String = listElement.getElementsByClass("txC_blue").first()?.text()?.substring(3, 4) ?: "0"
            val locationList: List<String> = listElement
                .getElementsByClass("loca")
                .map { it.getElementsByTag("string").first()?.text() ?: "" }

            resultList.add(
                UsedSearchBook(
                    provider = UsedBookProvider.OFFLINE_YES24,
                    title = title,
                    author = author,
                    cover = cover,
                    link = url,
                    stockCount = stockCount.toInt(),
                    minPrice = minPrice.toInt(),
                    locationList = locationList,
                )
            )
        }

        return resultList
    }

}