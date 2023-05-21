package com.jinkyumpark.search.apiResponse.data4library

import com.jinkyumpark.search.general.response.BookResponse

data class ApiData4LibraryBookDetailResponse(
    val response: ApiData4LibraryBookDetailResponseResponse,
) {

    fun toBookResponse(): BookResponse {
        return BookResponse(
            isbn = response.request.isbn13.toLong(),
            title = response.detail.first().book.bookname,
            author = response.detail.first().book.authors,

            cover = response.detail.first().book.bookImageURL,
            description = response.detail.first().book.description,
            publisher = response.detail.first().book.publisher,
            publishDate = null,
        )
    }
}

data class ApiData4LibraryBookDetailResponseResponse(
    val request: ApiData4LibraryBookDetailRequest,
    val detail: List<ApiData4LibraryBookDetailObject>
)

data class ApiData4LibraryBookDetailObject(
    val book: ApiData4LibraryBookDetailBook
)

data class ApiData4LibraryBookDetailRequest(
    val isbn13: String,
)

data class ApiData4LibraryBookDetailBook(
    val no: Int,
    val bookname: String,
    val publication_date: String,
    val authors: String,
    val publisher: String,
    val class_no: String,
    val class_nm: String,
    val publication_year: String,
    val bookImageURL: String,
    val isbn: String,
    val isbn13: String,
    val description: String,
)