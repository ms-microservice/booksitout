package com.jinkyumpark.core.book;

import com.jinkyumpark.core.book.dto.BookResponse;
import com.jinkyumpark.core.book.dto.MyBookSearchRange;
import com.jinkyumpark.core.book.model.book.Book;
import com.jinkyumpark.common.exception.BadRequestException;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController @RequestMapping("v2/book")
public class BookControllerV2 {

    private final BookService bookService;

    @GetMapping("my-book")
    public List<BookResponse> getMyBookSearchResult(@RequestParam("query") String query,
                                                    @RequestParam(value = "range", required = false) String range,
                                                    @LoginUser LoginAppUser loginAppUser) {
        if (query.length() < 2) throw new BadRequestException("Query must be more than 2");

        MyBookSearchRange myBookSearchRange;
        if (range == null) {
            myBookSearchRange = MyBookSearchRange.ALL;
        } else {
            try {
                myBookSearchRange = MyBookSearchRange.valueOf(range);
            } catch (Exception e) {
                throw new BadRequestException("not a valid search range");
            }
        }

        List<Book> bookResult = bookService.getBookByQuery(loginAppUser.getId(), query, myBookSearchRange);

        return bookResult.stream()
                .map(BookResponse::of)
                .collect(Collectors.toList());
    }

}
