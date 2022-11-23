package com.jinkyumpark.bookitout.memo;

import com.jinkyumpark.bookitout.book.BookService;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.exception.common.NotAuthorizeException;
import com.jinkyumpark.bookitout.exception.custom.BookNotSharingException;
import com.jinkyumpark.bookitout.user.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/memo")
public class MemoControllerV1 {
    private MemoService memoService;
    private BookService bookService;

    @GetMapping("all/{bookId}")
    public List<Memo> getAllMemoByBookId(@PathVariable("bookId") Long bookId) {
        Book book = bookService.getBookById(bookId);
        Long loginUserId = AppUserService.getLoginAppUserId();

        if (!book.getAppUser().getAppUserId().equals(loginUserId) && !book.getIsSharing()) {
            throw new BookNotSharingException("해당 책은 공유를 허용하지 않았어요");
        }

        List<Memo> memoList = memoService.getAllMemoByBookId(bookId);
        return memoList;
    }
}
