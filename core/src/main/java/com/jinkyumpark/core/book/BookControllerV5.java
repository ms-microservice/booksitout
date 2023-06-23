package com.jinkyumpark.core.book;

import com.jinkyumpark.core.book.dto.BookResponse;
import com.jinkyumpark.core.book.dto.BookSearchResultAddRequest;
import com.jinkyumpark.core.book.model.book.Book;
import com.jinkyumpark.core.book.model.customBook.BookCustom;
import com.jinkyumpark.core.common.PageUtils;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController @RequestMapping("v5/book")
public class BookControllerV5 {

    private final BookService bookService;

    @GetMapping("done/{year}")
    public List<BookResponse> getAllDoneBookByYear(@LoginUser LoginAppUser user,
                                                   @PathVariable("year") int year,
                                                   @RequestParam(value = "page", required = false) Integer page,
                                                   @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = PageUtils.pageable(page, size);

        return bookService.getAllDoneBookByYear(user.getId(), year, pageable).stream()
                .map(BookResponse::ofCover)
                .collect(Collectors.toList());
    }

    @PostMapping
    public BookResponse addBook(@LoginUser LoginAppUser user,
                                @RequestBody @Valid BookSearchResultAddRequest bookAddRequest) {
        Book book = bookAddRequest.toBookEntity(user.getId());
        BookCustom bookCustom = bookAddRequest.toBookCustomEntity();

        Book savedBook = bookService.addBookAndBookCustom(book, bookCustom);

        return BookResponse.of(savedBook);
    }

}
