package com.jinkyumpark.core.bookIsbn;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor

@RequestMapping("v4/book-isbn")
@RestController
public class BookIsbnControllerV4 {

    private final BookIsbnService bookIsbnService;

    @GetMapping("{isbn}")
    public BookIsbnDto getBookInfoByIsbn(@PathVariable("isbn") Integer isbn) {
        return bookIsbnService.getBookInfoByIsbn(isbn);
    }

}