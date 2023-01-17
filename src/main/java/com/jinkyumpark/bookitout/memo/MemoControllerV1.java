package com.jinkyumpark.bookitout.memo;

import com.jinkyumpark.bookitout.book.BookService;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.user.login.LoginAppUser;
import com.jinkyumpark.bookitout.user.login.LoginUser;
import com.jinkyumpark.bookitout.book.exception.BookNotSharingException;
import com.jinkyumpark.bookitout.memo.request.MemoAddRequest;
import com.jinkyumpark.bookitout.memo.request.MemoEditRequest;
import com.jinkyumpark.bookitout.common.response.AddSuccessResponse;
import com.jinkyumpark.bookitout.common.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.common.response.EditSuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController @RequestMapping("/v1/memo")
public class MemoControllerV1 {
    private final MessageSourceAccessor messageSource;
    private final MemoService memoService;
    private final BookService bookService;

    @GetMapping("all/{bookId}")
    public List<Memo> getAllMemoByBookId(@PathVariable("bookId") Long bookId, @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, bookId);

        if (!book.getAppUser().getAppUserId().equals(loginAppUser.getId()) && !book.getIsSharing()) {
            throw new BookNotSharingException(messageSource.getMessage("memo.get.fail.not-sharing"));
        }

        return memoService.getAllMemoByBookId(bookId);
    }

    @PostMapping("{bookId}")
    public AddSuccessResponse addMemo(@PathVariable("bookId") Long bookId,
                                      @RequestBody @Valid MemoAddRequest memoAddRequest,
                                      @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, bookId);
        Long memoId = memoService.addMemo(memoAddRequest, book);

        return new AddSuccessResponse(messageSource.getMessage("memo.add.success"));
    }

    @PutMapping("{memoId}")
    public EditSuccessResponse editMemo(@PathVariable("memoId") Long memoId,
                                        @RequestBody @Valid MemoEditRequest memoEditRequest,
                                        @LoginUser LoginAppUser loginAppUser) {
        memoService.editMemo(memoId, memoEditRequest, loginAppUser);

        return new EditSuccessResponse(String.format("PUT /v1/memo/%d", memoId), messageSource.getMessage("memo.edit.success"));
    }

    @DeleteMapping("{memoId}")
    public DeleteSuccessResponse deleteMemo(@PathVariable("memoId") Long memoId, @LoginUser LoginAppUser loginAppUser) {
        memoService.deleteMemo(memoId, loginAppUser);

        return new DeleteSuccessResponse(String.format("DELETE /v1/memo/%d", memoId), messageSource.getMessage("memo.delete.success"));
    }
}
