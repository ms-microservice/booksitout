package com.jinkyumpark.core.book;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.PagedResponse;
import com.jinkyumpark.core.book.dto.BookResponse;
import com.jinkyumpark.core.book.dto.BookSearchResultAddRequest;
import com.jinkyumpark.core.book.model.book.Book;
import com.jinkyumpark.core.common.feign.UserClient;
import com.jinkyumpark.core.common.feign.response.PublicUserResponse;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    private final UserClient userClient;

    @GetMapping("recent")
    public List<BookResponse> getRecentBook(@LoginUser LoginAppUser loginAppUser,
                                                  @RequestParam(name = "page", required = false) Integer page,
                                                  @RequestParam(name = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 6;

        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("lastModifiedDate").descending());

        List<Book> book = bookService.getAllBookByAppUserId(loginAppUser.getId(), pageable);

        return book.stream()
                .map(BookResponse::of)
                .collect(Collectors.toList());
    }

    @GetMapping("last")
    public BookResponse getLastBook(@LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getLastBookByAppUserIdThrowNoContent(loginAppUser.getId());

        return BookResponse.of(book);
    }

    @GetMapping("sharing")
    public List<BookResponse> getBookByNickname(@RequestParam("name") String nickName,
                                                @RequestParam(value = "page", required = false) Integer page,
                                                @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("lastModifiedDate").descending());

        PublicUserResponse publicUser = userClient.getPublicUserByNickname(nickName);

        return bookService.getAllSharingBooksByAppUserId(publicUser.getAppUserId(), pageable).stream()
                .map(BookResponse::of)
                .collect(Collectors.toList());
    }

    @GetMapping("sharing/paged")
    public PagedResponse<List<BookResponse>> getBookByNicknamePaged(@RequestParam("name") String nickName,
                                                                    @RequestParam(value = "page", required = false) Integer page,
                                                                    @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("lastModifiedDate").descending());

        PublicUserResponse publicUser = userClient.getPublicUserByNickname(nickName);
        Page<Book> paged = bookService.getAllSharingBooksByAppUserIdPaged(publicUser.getAppUserId(), pageable);
        List<BookResponse> content = paged.getContent().stream()
                .map(BookResponse::of)
                .collect(Collectors.toList());

        return PagedResponse.<List<BookResponse>>builder()
                .first(paged.isFirst())
                .last(paged.isLast())
                .totalPages(paged.getTotalPages())
                .totalElements(paged.getNumberOfElements())
                .content(content)
                .build();
    }

    @PostMapping("with-isbn")
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

    @PostMapping
    public AddSuccessResponse addBookBySearchResult(@RequestBody BookSearchResultAddRequest bookAddRequest,
                                                    @LoginUser LoginAppUser loginAppUser) {

        Long addedBookId = bookService.addBook(bookAddRequest.toDto(loginAppUser.getId()));

        return AddSuccessResponse.builder()
                .id(addedBookId)
                .build();
    }

}
