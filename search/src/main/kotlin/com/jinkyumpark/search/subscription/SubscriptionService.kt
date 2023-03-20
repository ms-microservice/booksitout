package com.jinkyumpark.search.subscription

import com.jinkyumpark.search.apiResponse.millie.ApiMillieBook
import com.jinkyumpark.search.apiResponse.millie.ApiMillieResponse
import com.jinkyumpark.search.apiResponse.ridi.ApiRidiBook
import com.jinkyumpark.search.apiResponse.ridi.ApiRidiResponse
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element
import org.jsoup.parser.Parser
import org.jsoup.select.Elements
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class SubscriptionService(
    val webClient: WebClient
) {

    fun getSearchResult(query: String, provider: SubscriptionProvider): List<SubscriptionSearchResponse> {
        return when (provider) {
            SubscriptionProvider.MILLIE -> millie(query)
            SubscriptionProvider.YES24 -> yes24(query)
            SubscriptionProvider.RIDI -> ridi(query)
            SubscriptionProvider.KYOBO -> kyobo(query)
        }
    }

    private fun millie(query: String): List<SubscriptionSearchResponse> {
        val url: String = "https://live-api.millie.co.kr/v2/search/content?" +
                "debug=1&searchType=content&keyword=$query&contentlimitCount=5&postlimitCount=0&librarylimitCount=0&startPage=1&contentCode=245"

        val response: ApiMillieResponse = webClient
            .get()
            .uri(url)
            .retrieve()
            .bodyToMono(ApiMillieResponse::class.java)
            .block() ?: return listOf()

        return response.respData?.list?.map(ApiMillieBook::toSubscriptionSearchResult)!!
    }

    private fun yes24(query: String): List<SubscriptionSearchResponse> {
        val url = "https://bookclub.yes24.com/BookClub/Search?query=$query"

        val document: Document = Jsoup.connect(url).parser(Parser.htmlParser()).get()
        val element: Element = document.getElementById("yesSchList") ?: return listOf()
        val listElements: Elements = element.getElementsByTag("li")

        return listElements
            .map { listElement ->
                val titleLinkElement: Element = listElement.getElementsByClass("gd_name").first()!!
                val title: String = titleLinkElement.text()
                val link: String = titleLinkElement.attr("href")

                val author: String = listElement.getElementsByClass("info_auth").first()?.text()?.trim() ?: ""
                val cover: String = listElement.getElementsByClass("lazy").first()?.text()?.trim() ?: ""

                SubscriptionSearchResponse(
                    title = title,
                    author = author,
                    link = link,
                    cover = cover,
                    provider = SubscriptionProvider.YES24
                )
            }
    }

    private fun ridi(query: String): List<SubscriptionSearchResponse> {
        val url = "https://search-api.ridibooks.com/search?site=ridi-select&where=book&what=instant&keyword=$query"

        val response: ApiRidiResponse = webClient
            .get()
            .uri(url)
            .retrieve()
            .bodyToMono(ApiRidiResponse::class.java)
            .block()!!

        return response.books.map(ApiRidiBook::toSubscriptionSearchResponse)
    }

    private fun kyobo(query: String): List<SubscriptionSearchResponse> {
        val url = "https://search.kyobobook.co.kr/search?keyword=$query&target=sam&gbCode=TOT&cat1=eBook@SAM"

        val document: Document = Jsoup.connect(url).get().parser(Parser.htmlParser())
        val productList: Elements = document.getElementsByClass("prod_item")

        val result: MutableList<SubscriptionSearchResponse> = mutableListOf()
        for (product: Element in productList) {
            val bookId: String = product.getElementsByTag("input").first()?.attr("data-bid") ?: continue
            val title: String =
                product.getElementsByClass("prod_info").first()?.getElementsByTag("span")?.last()?.text() ?: "?"
            val author: String = product.getElementsByClass("author").first()?.text() ?: "?"
            val link: String = product.getElementsByClass("btn_sm btn_light_gray").first()?.attr("href") ?: ""

            result.add(
                SubscriptionSearchResponse(
                    title = title,
                    author = author,
                    cover = "https://contents.kyobobook.co.kr/pdt/$bookId.jpg",
                    link = link,
                    provider = SubscriptionProvider.KYOBO,
                )
            )
        }

        return result
    }

}