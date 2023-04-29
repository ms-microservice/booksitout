package com.jinkyumpark.search.offlineLibrary

import com.fasterxml.jackson.databind.ObjectMapper
import com.jinkyumpark.search.apiResponse.availableLibrary.ApiAvailableLibraryLibsLib
import com.jinkyumpark.search.apiResponse.availableLibrary.ApiAvailableLibraryResponse
import com.jinkyumpark.search.config.jsoup.SSLHelper
import com.jinkyumpark.search.offlineLibrary.library.Library
import com.jinkyumpark.search.offlineLibrary.response.AvailableLibrary
import com.jinkyumpark.search.offlineLibrary.response.OfflineLibraryBook
import org.jsoup.parser.Parser
import org.springframework.beans.factory.annotation.Value
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class OfflineLibraryService(
    @Value("\${search.data4library.secret}")
    private val data4LibraryApiKey: String,

    val webClient: WebClient,
    val objectMapper: ObjectMapper,
) {

    @Cacheable(value = ["library-region"], key = "#isbn + ' ' + #regionCode + ' ' + #regionDetailCode")
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

    fun getYeongdeungpoguResult(query: String, target: List<Library>): List<OfflineLibraryBook> {
        val body = mapOf(
            "searchKeyword" to query,
            "searchType" to "SIMPLE",
            "searchCategory" to "ALL",
            "searchKey" to "ALL",
            "searchLibraryArr" to target
                .filter { it.city?.englishName == "YEONGDEUNGPOGU" }
                .map { it.webCrawlingCode }
                .joinToString(",")
        )

        val document = SSLHelper
            .getConnection("https://www.ydplib.or.kr/sylib/plusSearchResultList.do")
            .parser(Parser.htmlParser())
            .data(body)
            .post()

        val resultList = document.getElementsByClass("resultList").first()?.getElementsByTag("li") ?: return listOf()

        return resultList
            .map {
                val loanPossible = it
                    .getElementsByClass("bookStateBar")
                    .first()
                    ?.getElementsByTag("b")
                    ?.first()
                    ?.text()
                    ?.contains("가능")
                    ?: false

                val searchResultDetailFunctionArgument = it
                    .getElementsByClass("chk")
                    .first()
                    ?.getElementsByTag("input")
                    ?.attr("value")
                    ?.split("^")

                OfflineLibraryBook(
                    title = it
                        .getElementsByClass("tit")
                        .first()
                        ?.getElementsByTag("a")
                        ?.first()
                        ?.text()
                        ?.replace("[0-9][.] ".toRegex(), "")
                        ?: "?",

                    author = it
                        .getElementsByClass("author")
                        .first()
                        ?.getElementsByTag("span")
                        ?.first()
                        ?.text()
                        ?.replace("저자 : ", "")
                        ?: "?",

                    cover = it
                        .getElementsByClass("img")
                        .first()
                        ?.getElementsByTag("img")
                        ?.first()
                        ?.attr("src")
                        ?: "",

                    isbn = it
                        .getElementsByClass("data")
                        .first()
                        ?.getElementsByTag("span")
                        ?.first()
                        ?.text()
                        ?.replace("ISBN: ", "")
                        ?: "?",

                    link = if (searchResultDetailFunctionArgument == null) "" else
                        """https://www.ydplib.or.kr/intro/menu/10003/program/30001/plusSearchResultDetail.do?recKey=${searchResultDetailFunctionArgument.first()}&bookKey=${searchResultDetailFunctionArgument[1]}&publishFormCode=${searchResultDetailFunctionArgument.last()}""".trimIndent(),

                    publishYear = null,

                    library = it
                        .getElementsByClass("site")
                        ?.first()
                        ?.getElementsByTag("span")
                        ?.first()
                        ?.text()
                        ?.replace("도서관: ", "")
                        ?.take(5)
                        ?: "",

                    location = it
                        .getElementsByClass("data")
                        .first()
                        ?.getElementsByTag("span")
                        ?.last()
                        ?.text()
                        ?.replace("ISBN: ", "")
                        ?.replace("청구기호: ", "")
                        ?.replace("위치출력", "")
                        ?: "?",

                    isLoanPossible = loanPossible,
                    isReservationPossible = true,
                    reservationCount = if (loanPossible) 0 else it
                        .getElementsByClass("bookStateBar")
                        .first()
                        ?.getElementsByTag("span")
                        ?.first()
                        ?.text()?.replace("[^0-9]+".toRegex(), "")?.toInt()
                        ?: 0,
                    returnDate = if (loanPossible) null else null,
                )
            }
    }
}