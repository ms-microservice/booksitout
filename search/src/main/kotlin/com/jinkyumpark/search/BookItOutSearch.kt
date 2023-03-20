package com.jinkyumpark.search

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching

@SpringBootApplication
class BookItOutSearch

fun main(args: Array<String>) {
    runApplication<BookItOutSearch>(*args)
}
