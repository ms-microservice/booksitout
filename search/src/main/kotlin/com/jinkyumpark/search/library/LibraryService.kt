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
import org.jsoup.nodes.Element
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
        val url =
            "https://lib.goe.go.kr/gg/intro/search/index.do?menu_idx=10&viewPage=1&book_list=&title=$query&author=&publer=&keyword=&booktype=BOOK&shelfCode=&libraryCodes=MA&_libraryCodes=on&sortField=NONE&sortType=ASC&rowCount=10#search_result"

        val document: Document = Jsoup.connect(url).parser(Parser.htmlParser()).get()
        val bookList: Elements = document
            .getElementsByClass("imageType")
            .first()
            ?.getElementsByClass("row")
            ?: return listOf()

        val resultList: List<OnlineLibraryResponse> = bookList.map { book ->
            val title: String = book.getElementsByClass("book-title").first()?.getElementsByTag("span")?.text() ?: "?"
            val bookInfoText: String = book.getElementsByClass("book-status-info").first()?.text() ?: "?"
            val author: String = bookInfoText.substring(5, bookInfoText.indexOf('|'))
            val cover: String = book.getElementsByTag("img").first()?.attr("src") ?: ""
            val link: String = book.getElementsByClass("book-title").first()?.attr("href") ?: ""
            val loanPossible: Boolean = book.getElementsByClass("state typeC").first()?.text().equals("대출가능")
            val reservationPossible: Boolean = !book.getElementsByClass("state typeC").first()?.text().equals("예약불가")

            OnlineLibraryResponse(
                title = title,
                author = author,
                cover = cover,
                link = "https://lib.goe.go.kr/gg/intro/search/$link",
                loanPossible = loanPossible,
                reservationPossible = !loanPossible && reservationPossible,
                provider = OnlineLibraryProvider.GYEONGGI_EDUCATION_LIBRARY
            )
        }

        return resultList;
    }

    fun gwanghwamunLibrary(query: String): List<OnlineLibraryResponse> {
        val url =
            "http://kyobostory.dkyobobook.co.kr/Kyobo_T3_Mobile/Tablet/Main/Ebook_List.asp?keyword=$query&sortType=3"

        val document: Document = Jsoup.connect(url).parser(Parser.htmlParser()).get()
        val bookList: Elements =
            document.getElementsByClass("bookListType01").first()?.getElementsByTag("li") ?: return listOf()

        val resultList: List<OnlineLibraryResponse> = mutableListOf()
        for (book: Element in bookList) {
            val title: String = book.getElementsByClass("tit").first()!!.text()
            val author: String = book.getElementsByClass("writer").first()!!.text()
            val cover: String = book.getElementsByClass("thum").first()!!.getElementsByTag("img").first()!!.attr("src")
            val bookId: String = book.getElementsByClass("btn").first()!!.getElementsByTag("input").attr("barcode")
            val link =
                "http://kyobostory.dkyobobook.co.kr/Kyobo_T3_Mobile/Tablet/Main/Ebook_Detail.asp?barcode=$bookId&type=&product_cd=001&adult_yn=N"
            val currentLoanCount: Int =
                book.getElementsByClass("out").first()!!.getElementsByTag("span")[1].text().toInt()
            val maxLoanCount: Int = book.getElementsByClass("out").first()!!.getElementsByTag("span")[2].text().toInt()

            resultList + OnlineLibraryResponse(
                title = title,
                author = author,
                cover = cover,
                link = link,
                loanPossible = currentLoanCount < maxLoanCount,
                reservationPossible = currentLoanCount >= maxLoanCount,
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