package com.jinkyumpark.search.onlineLibrary

import com.fasterxml.jackson.databind.ObjectMapper
import com.jinkyumpark.search.apiResponse.seoulLibrary.ApiSeoulLibraryBook
import com.jinkyumpark.search.apiResponse.seoulLibrary.ApiSeoulLibraryResponse
import com.jinkyumpark.search.common.SearchProvider
import com.jinkyumpark.search.common.SearchResult
import com.jinkyumpark.search.common.BookSearchService
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.parser.Parser
import org.jsoup.select.Elements
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class OnlineLibraryService(
    @Value("\${search.data4library.api-key}")
    private val data4LibraryApiKey: String,

    val webClient: WebClient,
    val objectMapper: ObjectMapper,
): BookSearchService {

    @Cacheable(value = ["online-library"], keyGenerator = "searchKeyGenerator")
    override fun getSearchResult(query: String, provider: SearchProvider): List<SearchResult> {
        return when (provider) {
            SearchProvider.GYEONGGI_EDUCATION_LIBRARY -> gyeonggiEducationLibrary(query)
            SearchProvider.SEOUL_LIBRARY -> seoulLibrary(query, 5)
            SearchProvider.GWANGHWAMUN_LIBRARY -> gwanghwamunLibrary(query)
            SearchProvider.SEOUL_EDUCATION_LIBRARY -> seoulEducationLibrary(query)
            SearchProvider.NATIONAL_ASSEMBLY_LIBRARY -> nationalAssemblyLibrary(query)
            SearchProvider.SEOUL_CONGRESS_LIBRARY -> seoulCongressLibrary(query)

            else -> listOf()
        }
    }

    fun seoulLibrary(query: String, limit: Int): List<SearchResult> {
        val url =
            "https://elib.seoul.go.kr/api/contents/search?searchKeyword=$query&sortOption=1&contentType=EB&innerSearchYN=N&innerKeyword=&libCode=&currentCount=1&pageCount=$limit&_=1675593987342"

        val response: ApiSeoulLibraryResponse = webClient
            .get()
            .uri(url)
            .retrieve()
            .bodyToMono(ApiSeoulLibraryResponse::class.java)
            .block() ?: return listOf()

        return response.bookList
            .map(ApiSeoulLibraryBook::toOnlineLibraryResponse)
    }

    fun gyeonggiEducationLibrary(query: String): List<SearchResult> {
        val url = "https://lib.goe.go.kr/elib/module/elib/search/index.do?menu_idx=94&viewPage=1&search_text=$query"

        val document: Document = Jsoup.connect(url).parser(Parser.htmlParser()).get()
        val bookList: Elements = document
            .getElementById("search-results")
            ?.getElementsByClass("row") ?: return listOf()

        val resultList: List<SearchResult> = bookList
            .map {
                val title = it
                    .getElementsByClass("name goDetail").first()
                    ?.getElementsByTag("span")?.first()
                    ?.text() ?: ""
                val cover = it.getElementsByTag("img").first()?.attr("src") ?: ""

                val bookIndex = it.getElementsByTag("a").first()?.attr("data-book_idx") ?: ""
                val link = "https://lib.goe.go.kr/elib/module/elib/book/view.do?book_idx=$bookIndex"

                val infoText = it.getElementsByTag("p").first()?.text() ?: ""
                val author = infoText.substring(5, infoText.indexOf("출판사") - 2)
                val loanPossible = infoText.contains("대출 가능")
                val reservationPossible = !loanPossible

                SearchResult(
                    title = title,
                    author = author,
                    cover = cover,
                    link = link,
                    loanPossible = loanPossible,
                    reservationPossible = reservationPossible,
                    searchProvider = SearchProvider.GYEONGGI_EDUCATION_LIBRARY,
                )
            }

        return resultList
    }

    fun gwanghwamunLibrary(query: String): List<SearchResult> {
        val url =
            "http://kyobostory.dkyobobook.co.kr/Kyobo_T3_Mobile/Tablet/Main/Ebook_List.asp?keyword=$query&sortType=3"

        val document: Document = Jsoup.connect(url).parser(Parser.htmlParser()).get()
        val bookList: Elements =
            document.getElementsByClass("bookListType01").first()?.getElementsByTag("li") ?: return listOf()

        return bookList.map { book ->
            val title: String = book.getElementsByClass("tit").first()!!.text()
            val author: String = book.getElementsByClass("writer").first()!!.text()
            val cover: String = book.getElementsByClass("thum").first()!!.getElementsByTag("img").first()!!.attr("src")
            val bookId: String = book.getElementsByClass("btn").first()!!.getElementsByTag("input").attr("barcode")
            val link =
                "http://kyobostory.dkyobobook.co.kr/Kyobo_T3_Mobile/Tablet/Main/Ebook_Detail.asp?barcode=$bookId&type=&product_cd=001&adult_yn=N"
            val currentLoanCount: Int =
                book.getElementsByClass("out").first()!!.getElementsByTag("span")[1].text().toInt()
            val maxLoanCount: Int = book.getElementsByClass("out").first()!!.getElementsByTag("span")[2].text().toInt()

            val loanPossible: Boolean = currentLoanCount < maxLoanCount
            val reservationPossible: Boolean = !loanPossible && (currentLoanCount <= maxLoanCount)

            SearchResult(
                title = title,
                author = author,
                cover = cover,
                link = link,
                loanPossible = loanPossible,
                reservationPossible = reservationPossible,
                searchProvider = SearchProvider.GWANGHWAMUN_LIBRARY,
            )
        }
    }

    // TODO
    fun seoulEducationLibrary(query: String): List<SearchResult> {
        return listOf()
    }

    // TODO
    fun nationalAssemblyLibrary(query: String): List<SearchResult> {
        return listOf()
    }

    // TODO
    fun seoulCongressLibrary(query: String): List<SearchResult> {
        return listOf()
    }

}