package com.jinkyumpark.search

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication(scanBasePackages = ["com.jinkyumpark.bookitout", "com.jinkyumpark.search"])
class SearchApplication

fun main(args: Array<String>) {
    runApplication<SearchApplication>(*args)
}
