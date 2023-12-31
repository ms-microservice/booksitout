package com.jinkyumpark.search.config.redis

import org.springframework.cache.annotation.EnableCaching
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@EnableCaching
@Configuration
class RedisConfig {

    @Bean
    fun searchKeyGenerator(): SearchKeyGenerator {
        return SearchKeyGenerator()
    }

}