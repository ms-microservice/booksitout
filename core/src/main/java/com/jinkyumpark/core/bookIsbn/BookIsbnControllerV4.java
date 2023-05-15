package com.jinkyumpark.core.bookIsbn;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor

@RequestMapping("v4/book-isbn")
@RestController
public class BookIsbnControllerV4 {

    private final BookIsbnService bookIsbnService;

    @GetMapping("{isbn}")
    public BookIsbnDto getBookInfoByIsbn(@PathVariable("isbn") Long isbn) {
        return bookIsbnService.getBookInfoByIsbn(isbn);
    }

    @PostMapping("{isbn}")
    public void addBookIsbnIfAbsent(@PathVariable("isbn") Long isbn) {
        bookIsbnService.addBookIsbnIfAbsent(isbn);
    }

}