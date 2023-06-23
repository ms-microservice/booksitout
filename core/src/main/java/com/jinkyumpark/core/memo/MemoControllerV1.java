package com.jinkyumpark.core.memo;

import com.jinkyumpark.common.exception.UnauthorizedException;
import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.core.book.BookService;
import com.jinkyumpark.core.book.model.book.Book;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import com.jinkyumpark.core.memo.request.MemoAddRequest;
import com.jinkyumpark.core.memo.request.MemoEditRequest;
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

        if (!book.getAppUserId().equals(loginAppUser.getId()) && !book.getSharing()) {
            throw new UnauthorizedException(messageSource.getMessage("memo.get.fail.not-sharing"));
        }

        return memoService.getAllMemoByBookId(bookId);
    }

    @PostMapping("{bookId}")
    public AddSuccessResponse addMemo(@PathVariable("bookId") Long bookId,
                                      @RequestBody @Valid MemoAddRequest memoAddRequest,
                                      @LoginUser LoginAppUser loginAppUser) {
        Book book = bookService.getBookById(loginAppUser, bookId);
        MemoDto memoDto = MemoDto.builder()
                .bookId(bookId)
                .page(memoAddRequest.getPage())
                .content(memoAddRequest.getContent())
                .build();

        Long memoId = memoService.addMemo(memoDto);

        return AddSuccessResponse.builder()
                .id(memoId)
                .message(messageSource.getMessage("memo.add.success"))
                .build();
    }

    @PutMapping("{memoId}")
    public UpdateSuccessResponse editMemo(@PathVariable("memoId") Long memoId,
                                          @RequestBody @Valid MemoEditRequest memoEditRequest,
                                          @LoginUser LoginAppUser loginAppUser) {
        MemoDto memoDto = MemoDto.builder()
                .page(memoEditRequest.getPage())
                .content(memoEditRequest.getContent())
                .build();

        memoService.editMemo(memoId, memoDto, loginAppUser);

        return UpdateSuccessResponse.builder()
                .message(messageSource.getMessage("memo.edit.success"))
                .id(memoId)
                .build();
    }

    @DeleteMapping("{memoId}")
    public DeleteSuccessResponse deleteMemo(@PathVariable("memoId") Long memoId, @LoginUser LoginAppUser loginAppUser) {
        memoService.deleteMemo(memoId, loginAppUser);

        return DeleteSuccessResponse.builder()
                .message(messageSource.getMessage("memo.delete.success"))
                .build();
    }
}
