package com.jinkyumpark.core.book;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.core.book.request.BookSearchResultAddRequest;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
                Integer.parseInt(bookAddRequest.getIsbn())
        );

        return AddSuccessResponse.builder()
                .id(addedBookId)
                .build();
    }

}
