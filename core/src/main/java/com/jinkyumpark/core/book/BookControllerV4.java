package com.jinkyumpark.core.book;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.core.book.dto.BookSearchResultAddRequest;
import com.jinkyumpark.core.book.dto.RecentBookResponse;
import com.jinkyumpark.core.book.model.Book;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor

@RestController
@RequestMapping("v4/book")
public class BookControllerV4 {

    private final BookService bookService;

    @PostMapping
    public AddSuccessResponse addBookBySearchResultAndAddToBookIsbn(@RequestBody BookSearchResultAddRequest bookAddRequest,
                                                                    @LoginUser LoginAppUser loginAppUser) {

        Long addedBookId = bookService.addBookAndBookIsbn(
                bookAddRequest.toDto(loginAppUser.getId()),
                bookAddRequest.getIsbn()
        );

        return AddSuccessResponse.builder()
                .id(addedBookId)
                .build();
    }

    @GetMapping("recent")
    public List<RecentBookResponse> getRecentBook(@LoginUser LoginAppUser loginAppUser,
                                                  @RequestParam(name = "page", required = false) Integer page,
                                                  @RequestParam(name = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 6;

        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("lastModifiedDate").descending());

        List<Book> book = bookService.getAllBookByAppUserId(loginAppUser.getId(), pageable);

        return book.stream()
                .map(RecentBookResponse::of)
                .collect(Collectors.toList());
    }

    @GetMapping("last")
    public Book getLastBook(@LoginUser LoginAppUser loginAppUser) {
        return bookService.getLastBookByAppUserIdThrowNoContent(loginAppUser.getId());
    }

}
