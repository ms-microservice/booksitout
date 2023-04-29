package com.jinkyumpark.core.book;

import com.jinkyumpark.core.book.dto.BookDto;
import com.jinkyumpark.core.book.request.BookSearchResultAddRequest;
import com.jinkyumpark.common.response.AddSuccessResponse;
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
        BookDto bookDto = BookDto.builder()
                .title(bookAddRequest.getTitle())
                .author(bookAddRequest.getAuthor())
                .endPage(bookAddRequest.getPage())
                .cover(bookAddRequest.getCover())
                .isSharing(bookAddRequest.getSharing())
                .appUserId(loginAppUser.getId())
                .form(bookAddRequest.getForm())
                .source(bookAddRequest.getSource())
                .build();

        Long addedBookId = bookService.addBook(bookDto);

        return AddSuccessResponse.builder()
                .id(addedBookId)
                .build();
    }
}
