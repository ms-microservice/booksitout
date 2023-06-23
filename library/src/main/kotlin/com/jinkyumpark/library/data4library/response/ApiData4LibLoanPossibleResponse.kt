package com.jinkyumpark.library.data4library.response

data class ApiData4LibLoanPossibleResponse(
    val result: ApiData4LibLoanPossibleResponseResult,
)

data class ApiData4LibLoanPossibleResponseResult(
    val hasBook: Boolean,
    val loanAvailable: Boolean,
)
