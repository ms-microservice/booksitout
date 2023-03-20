package com.jinkyumpark.search.redis

import org.springframework.cache.interceptor.KeyGenerator
import java.lang.reflect.Method

class SearchKeyGenerator: KeyGenerator {

    override fun generate(target: Any, method: Method, vararg params: Any?): Any {
        val query = params[0].toString().lowercase().replace(" ".toRegex(), "")
        val provider = params[1]

        return "$query::$provider"
    }

}