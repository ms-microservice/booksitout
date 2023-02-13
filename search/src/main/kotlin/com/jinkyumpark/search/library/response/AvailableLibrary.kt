package com.jinkyumpark.search.library.response

data class AvailableLibrary(
    val code: String,
    val name: String,
    val address: String,
    val libraryLink: String,
    var bookLink: String?,
) {
    constructor(
        code: String, name: String, address: String, libraryLink: String
    ) : this(code, name, address, libraryLink, null)
}