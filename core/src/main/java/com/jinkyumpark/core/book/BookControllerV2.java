//package com.jinkyumpark.core.book;
//
//import com.jinkyumpark.core.book.model.Book;
//import com.jinkyumpark.core.common.exception.http.BadRequestException;
//import com.jinkyumpark.core.loginUser.LoginAppUser;
//import com.jinkyumpark.core.loginUser.LoginUser;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("v2/search")
//public class BookControllerV2 {
//    private final BookService bookService;
//
//    @GetMapping("my-book")
//    public List<MyBookSearchResult> getMyBookSearchResult(@RequestParam("query") String query,
//                                                          @RequestParam(value = "range", required = false) MyBookSearchRange myBookSearchRange,
//                                                          @LoginUser LoginAppUser loginAppUser) {
//        if (query.length() < 2) throw new BadRequestException("Query must be more than 2");
//        if (myBookSearchRange == null) myBookSearchRange = MyBookSearchRange.ALL;
//
//        List<Book> bookResult = bookService.getBookByQuery(loginAppUser.getId(), query, myBookSearchRange);
//
//        return bookResult.stream()
//                .map(b -> MyBookSearchResult.builder()
//                        .bookId(b.getBookId())
//                        .title(b.getTitle())
//                        .author(b.getAuthor())
//                        .cover(b.getCover())
//                        .currentPage(b.getCurrentPage())
//                        .endPage(b.getEndPage())
//                        .isGiveUp(b.getIsGiveUp())
//                        .build())
//                .collect(Collectors.toList());
//    }
//}