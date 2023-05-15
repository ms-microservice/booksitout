package com.jinkyumpark.core.book;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.core.book.dto.BookSearchResultAddRequest;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor

@RestController
@RequestMapping("v3/book")
public class BookControllerV3 {

    private final BookService bookService;

    @PostMapping
    public AddSuccessResponse addBookBySearchResult(@RequestBody BookSearchResultAddRequest bookAddRequest,
                                                    @LoginUser LoginAppUser loginAppUser) {
        Long addedBookId = bookService.addBook(bookAddRequest.toDto(loginAppUser.getId()));

        return AddSuccessResponse.builder()
                .id(addedBookId)
                .build();
    }
}
