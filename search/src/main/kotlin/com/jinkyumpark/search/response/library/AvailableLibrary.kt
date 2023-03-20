package com.jinkyumpark.search.response.library

import java.io.Serializable

data class AvailableLibrary(
    val code: String,
    val name: String,
    val address: String,
    val libraryLink: String,
    var bookLink: String?,
): Serializable {
    constructor(
        code: String, name: String, address: String, libraryLink: String
    ) : this(code, name, address, libraryLink, null)
}