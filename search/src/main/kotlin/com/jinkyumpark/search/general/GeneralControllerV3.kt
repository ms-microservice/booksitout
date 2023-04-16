package com.jinkyumpark.search.general

import com.jinkyumpark.search.general.response.AddBookResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("v3/search")
class GeneralControllerV3(
    val generalService: GeneralService
) {

    @GetMapping("new/naver")
    fun getNewNaverSearchResult(@RequestParam("query") query: String): List<AddBookResponse> {
        return generalService
            .getBookByQueryFromNaver(query)
    }

    @GetMapping("image/google")
    fun getBookImageFromGoogle(@RequestParam("query") query: String): List<String> {
        return generalService
            .getBookImageFromGoogle(query)
    }

}