package com.jinkyumpark.bookitout.memo;

import com.jinkyumpark.bookitout.common.exception.http.NotAuthorizeException;
import com.jinkyumpark.bookitout.memo.Memo;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.memo.MemoRepository;
import com.jinkyumpark.bookitout.memo.request.MemoAddRequest;
import com.jinkyumpark.bookitout.memo.request.MemoEditRequest;
import com.jinkyumpark.bookitout.common.exception.http.NotFoundException;
import com.jinkyumpark.bookitout.user.login.LoginAppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MemoService {
    private final MessageSourceAccessor messageSource;
    private final MemoRepository memoRepository;

    public List<Memo> getAllMemoByBookId(Long bookId) {
        return memoRepository.findAllMemoByBookId(bookId);
    }

    public Memo getMemoByMemoId(Long memoId) {
        return memoRepository.findById(memoId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("memo.get.fail.not-found")));
    }

    public Long addMemo(MemoDto memoDto) {
        return memoRepository.save(memoDto.toEntity()).getMemoId();
    }

    @Transactional
    public void editMemo(Long memoId, MemoDto memoDto, LoginAppUser loginAppUser) {
        Memo existingMemo = memoRepository.findById(memoId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("memo.edit.fail.not-found")));

        existingMemo.editMemo(memoDto);
    }

    @Transactional
    public void deleteMemo(Long memoId, LoginAppUser loginAppUser) {
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("memo.delete.fail.not-found")));

        if (!memo.getBook().getAppUser().getAppUserId().equals(loginAppUser.getId())) {
            throw new NotAuthorizeException(messageSource.getMessage("memo.delete.fail.not-authorize"));
        }

        memoRepository.deleteById(memoId);
    }
}