package com.jinkyumpark.search.general.service

import com.jinkyumpark.search.general.response.BestSellerBookResponse
import com.jinkyumpark.search.general.response.BookResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("v4/search")
class GeneralControllerV4(
    val popularBookService: PopularBookService,
    val bookInfoService: BookInfoService,
) {

    @GetMapping("popular/best-seller/aladin")
    fun getBestSellerFromAladin(): List<BestSellerBookResponse> {
        return popularBookService.getBestSellerFromAladin()
    }

    @GetMapping("by-isbn/data4library")
    fun getBookInfoFromData4Library(@RequestParam("isbn") isbn: Long): BookResponse? {
        return bookInfoService.getBookInfoFromData4library(isbn)
    }

}