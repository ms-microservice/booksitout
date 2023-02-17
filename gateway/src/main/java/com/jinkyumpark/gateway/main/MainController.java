package com.jinkyumpark.gateway.main;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @RequestMapping("/")
public class MainController {

    @GetMapping
    public MainResponse mainPage() {

        return MainResponse.builder()
                .message("private api for book-it-out")
                .redirectUrl("https://book.jinkyumpark.com")
                .build();
    }

}
