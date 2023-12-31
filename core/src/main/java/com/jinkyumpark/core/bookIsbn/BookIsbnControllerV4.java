package com.jinkyumpark.core.bookIsbn;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor

@RequestMapping("v4/book-isbn")
@RestController
public class BookIsbnControllerV4 {

    private final BookIsbnService bookIsbnService;

    @GetMapping("{isbn}")
    public BookIsbnDto getBookInfoByIsbn(@PathVariable("isbn") String isbn) {
        BookIsbn bookIsbn = bookIsbnService.getBookInfoAddIfAbsent(isbn);

        return BookIsbnDto.of(bookIsbn);
    }

    @PostMapping("{isbn}")
    public void addBookIsbnIfAbsent(@PathVariable("isbn") String isbn) {
        bookIsbnService.addBookIsbnIfAbsent(isbn);
    }

}