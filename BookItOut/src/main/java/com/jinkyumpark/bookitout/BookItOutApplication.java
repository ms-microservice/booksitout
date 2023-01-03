package com.jinkyumpark.bookitout;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BookItOutApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookItOutApplication.class, args);
    }

}