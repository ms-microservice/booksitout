package com.jinkyumpark.search.apiResponse.millie

import com.jinkyumpark.search.common.SearchProvider
import com.jinkyumpark.search.common.SearchResult

data class ApiMillieBook(
    val book_seq: String?,
    val content_name: String,
    val category: String?,
    val category2: String?,
    val category_seq: String?,
    val category_seq2: String?,
    val content_thumb_url: String?,
    val subtitle: String?,
    val view_percent: String?,
    val view_time: String?,
    val author: String,
    val content_code: String?,
    val audiobook_volume: String?,
    val audio_category_icon_value: String?,
    val audio_reader_icon_value: String?,
    val reader_name: String?,
    val reader_job: String?,
    val is_service: String?,
    val is_free: String?,
    val is_adult: String?,
    val is_b2b: String?,
    val is_series: String?,
    val is_series_complete: String?,
    val book_kind_code: String?,
    val series_count: String?,
    val series_group_name: String?,
    val series_type: String?,
    val coming_soon_date: String?,
    val is_ebook_rent: String?,
    val book_brand: String?,
    val content_take_count: String?,
    val content_review_count: String?,
    val ebook_published_at: String?,
) {
    fun toBookSearchResult(): SearchResult {
        return SearchResult(
            title = content_name,
            author = author,
            cover = content_thumb_url,
            link = "https://www.millie.co.kr/v3/bookDetail/$book_seq",
            searchProvider = SearchProvider.MILLIE_SUBSCRIPTION,
            isbn = null,
        )
    }

}