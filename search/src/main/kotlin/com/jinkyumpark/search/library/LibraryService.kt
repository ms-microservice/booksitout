package com.jinkyumpark.search.library

import com.fasterxml.jackson.databind.ObjectMapper
import com.jinkyumpark.search.library.apiResponse.availableLibrary.ApiAvailableLibraryLibsLib
import com.jinkyumpark.search.library.apiResponse.availableLibrary.ApiAvailableLibraryResponse
import com.jinkyumpark.search.library.apiResponse.seoulLibrary.ApiSeoulLibraryBook
import com.jinkyumpark.search.library.apiResponse.seoulLibrary.ApiSeoulLibraryResponse
import com.jinkyumpark.search.library.response.AvailableLibrary
import com.jinkyumpark.search.library.response.OnlineLibraryResponse
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.parser.Parser
import org.jsoup.select.Elements
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class LibraryService(
    @Value("\${search.data4library.api-key}")
    private val data4LibraryApiKey: String,

    val webClient: WebClient,
    val objectMapper: ObjectMapper,
) {

    fun getSearchResult(query: String, library: OnlineLibraryProvider): List<OnlineLibraryResponse> {
        return when (library) {
            OnlineLibraryProvider.GYEONGGI_EDUCATION_LIBRARY -> gyeonggiEducationLibrary(query)
            OnlineLibraryProvider.SEOUL_LIBRARY -> seoulLibrary(query, 5)
            OnlineLibraryProvider.GWANGHWAMUN_LIBRARY -> gwanghwamunLibrary(query)
            OnlineLibraryProvider.SEOUL_EDUCATION_LIBRARY -> seoulEducationLibrary(query)
            OnlineLibraryProvider.NATIONAL_ASSEMBLY_LIBRARY -> nationalAssemblyLibrary(query)
            OnlineLibraryProvider.SEOUL_CONGRESS_LIBRARY -> seoulCongressLibrary(query)
        }
    }

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

    fun seoulLibrary(query: String, limit: Int): List<OnlineLibraryResponse> {
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

    fun gyeonggiEducationLibrary(query: String): List<OnlineLibraryResponse> {
        val url = "https://lib.goe.go.kr/elib/module/elib/search/index.do?menu_idx=94&viewPage=1&search_text=$query"

        val document: Document = Jsoup.connect(url).parser(Parser.htmlParser()).get()
        val bookList: Elements = document
            .getElementById("search-results")
            ?.getElementsByClass("row") ?: return listOf()

        val resultList: List<OnlineLibraryResponse> = bookList
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

                OnlineLibraryResponse(
                    title = title,
                    author = author,
                    cover = cover,
                    link = link,
                    loanPossible = loanPossible,
                    reservationPossible = reservationPossible,
                    provider = OnlineLibraryProvider.GYEONGGI_EDUCATION_LIBRARY,
                )
            }

        return resultList
    }

    fun gwanghwamunLibrary(query: String): List<OnlineLibraryResponse> {
        val url =
            "http://kyobostory.dkyobobook.co.kr/Kyobo_T3_Mobile/Tablet/Main/Ebook_List.asp?keyword=$query&sortType=3"

        val document: Document = Jsoup.connect(url).parser(Parser.htmlParser()).get()
        val bookList: Elements =
            document.getElementsByClass("bookListType01").first()?.getElementsByTag("li") ?: return listOf()

        val resultList: List<OnlineLibraryResponse> = bookList.map { book ->
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

            OnlineLibraryResponse(
                title = title,
                author = author,
                cover = cover,
                link = link,
                loanPossible = loanPossible,
                reservationPossible = reservationPossible,
                provider = OnlineLibraryProvider.GWANGHWAMUN_LIBRARY,
            )
        }

        return resultList
    }

    // TODO
    fun seoulEducationLibrary(query: String): List<OnlineLibraryResponse> {
        return listOf()
    }

    // TODO
    fun nationalAssemblyLibrary(query: String): List<OnlineLibraryResponse> {
        return listOf()
    }

    // TODO
    fun seoulCongressLibrary(query: String): List<OnlineLibraryResponse> {
        return listOf()
    }

}