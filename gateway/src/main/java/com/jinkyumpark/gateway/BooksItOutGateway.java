package com.jinkyumpark.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class BooksItOutGateway {
    public static void main(String[] args) {
        SpringApplication.run(BooksItOutGateway.class, args);
    }

    @GetMapping
    public MainResponse mainPage() {

        return MainResponse.builder()
                .message("private api for booksitout")
                .redirectUrl("https://booksitout.com")
                .build();

    }
}
