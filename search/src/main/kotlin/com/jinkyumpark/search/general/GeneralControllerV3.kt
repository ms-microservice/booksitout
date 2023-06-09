package com.jinkyumpark.search.general

import com.jinkyumpark.search.general.response.AddBookResponse
import com.jinkyumpark.search.general.service.BookInfoService
import com.jinkyumpark.search.general.service.ImageService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("v3/search")
class GeneralControllerV3(
    val imageService: ImageService,
    val bookInfoService: BookInfoService,
) {

    @GetMapping("new/naver")
    fun getNewNaverSearchResult(@RequestParam("query") query: String): List<AddBookResponse> {
        return bookInfoService
            .getBookByQueryFromNaver(query)
    }

    @GetMapping("new/naver/isbn/{isbn}")
    fun getNewNaverSearchResultByIsbn(@PathVariable("isbn") isbn: String): AddBookResponse? {
        return bookInfoService.getBookByIsbnFromNaver(isbn)
    }

    @GetMapping("image/google")
    fun getBookImageFromGoogle(@RequestParam("query") query: String): List<String> {
        return imageService
            .getBookImageFromGoogle(query, "")
    }

    @GetMapping("image/google/separate-title-author")
    fun getBookImageFromGoogle(@RequestParam("title") title: String, @RequestParam("author") author: String): List<String> {
        return imageService
            .getBookImageFromGoogle(title, author)
    }

}