package com.jinkyumpark.search.service

import com.jinkyumpark.search.apiResponse.aladin.ApiAladinResponse
import com.jinkyumpark.search.provider.SearchProvider
import com.jinkyumpark.search.response.SearchResult
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
):BookSearchService {

    override fun getSearchResult(query: String, provider: SearchProvider): List<SearchResult> {
        return when (provider) {
            SearchProvider.KYOBO_USED_ONLINE -> kyoboOnline(query)
            SearchProvider.YES24_USED_ONLINE -> yes24Online(query)
            SearchProvider.INTERPARK_USED_ONLINE -> interparkOnline(query)
            SearchProvider.ALADIN_USED_ONLINE -> aladin(query)

            SearchProvider.YES24_USED_OFFLINE -> yes24Offline(query)

            else -> listOf()
        }
    }

    private fun aladin(query: String?): List<SearchResult> {
        val url = "http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?TTBKey=$aladinApiKey&Query=$query&SearchTarget=USED&outofStockfilter=1&Output=JS&OptResult=usedList&version=20131101"

        val response: ApiAladinResponse = webClient
            .get()
            .uri(url)
            .retrieve()
            .bodyToMono(ApiAladinResponse::class.java)
            .block() ?: return listOf()

        val onlineUsed: List<SearchResult> = response.item
            ?.filter { it.subInfo?.usedList?.aladinUsed?.itemCount != 0 }
            ?.map { it.toSearchResult(SearchProvider.ALADIN_USED_ONLINE) }
            ?: listOf()

        val offlineUsed = response.item
            ?.filter { it.subInfo?.usedList?.spaceUsed?.itemCount != 0 }
            ?.map { it.toSearchResult(SearchProvider.ALADIN_USED_OFFLINE) }
            ?: listOf()

        return listOf(*onlineUsed.toTypedArray(), *offlineUsed.toTypedArray())
    }

    private fun kyoboOnline(query: String): List<SearchResult> {
        val url = String.format("https://search.kyobobook.co.kr/search?keyword=%s&gbCode=TOT&target=used", query)

        return listOf()
    }

    private fun interparkOnline(query: String): List<SearchResult> {
        return listOf()
    }

    private fun yes24Online(query: String): List<SearchResult> {
        return listOf()
    }

    private fun yes24Offline(query: String): List<SearchResult> {
        val url = "http://www.yes24.com/product/search?domain=STORE&query=$query&page=1&size=10&dispNo1=001"

        val document: Document = Jsoup.connect(url).parser(Parser.htmlParser()).get()
        val listElements = document.getElementById("yesSchList")?.getElementsByTag("li") ?: return listOf()

        val resultList: MutableList<SearchResult> = mutableListOf()
        for (listElement in listElements) {
            val title: String = listElement.getElementsByClass("gd_name").first()?.text() ?: continue
            val author: String = listElement.getElementsByClass("info_auth").first()?.getElementsByTag("a")?.first()?.text() ?: ""
            val cover: String = listElement.getElementsByTag("img").first()?.attr("data-original") ?: ""
            val minPrice: String = listElement.getElementsByClass("txt_num").first()?.text()?.replace(",", "")?.replace("원", "") ?: "0"
            val stockCount: String = listElement.getElementsByClass("txC_blue").first()?.text()?.substring(3, 4) ?: "0"
            val locationList: List<String> = listElement
                .getElementsByClass("loca")
                .map { it.getElementsByTag("strong").first()?.text() ?: "" }
                .filterNot { it == "강서 NC점" }

            resultList.add(
                SearchResult(
                    searchProvider = SearchProvider.YES24_USED_OFFLINE,
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
            .filter { it.locationList.isNotEmpty() }
    }

}