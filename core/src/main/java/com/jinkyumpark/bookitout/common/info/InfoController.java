package com.jinkyumpark.bookitout.common.info;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController @RequestMapping("/")
public class InfoController {

    @GetMapping
    public InfoResponse mainPage() {
        InfoResponse infoResponse = InfoResponse.builder()
                .message("private api for book-it-out, you must access from https://book.jinkyumpark.com")
                .build();

        return infoResponse;
    }

}
