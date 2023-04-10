package com.jinkyumpark.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class BookItOutGateway {
    public static void main(String[] args) {
        SpringApplication.run(BookItOutGateway.class, args);
    }

    @GetMapping
    public MainResponse mainPage() {

        return MainResponse.builder()
                .message("private api for book-it-out")
                .redirectUrl("https://book.jinkyumpark.com")
                .build();
    }
}
