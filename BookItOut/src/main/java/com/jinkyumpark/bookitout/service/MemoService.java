package com.jinkyumpark.bookitout.service;

import com.jinkyumpark.bookitout.model.Memo;
import com.jinkyumpark.bookitout.model.book.Book;
import com.jinkyumpark.bookitout.repository.MemoRepository;
import com.jinkyumpark.bookitout.request.memo.MemoAddRequest;
import com.jinkyumpark.bookitout.request.memo.MemoEditRequest;
import com.jinkyumpark.bookitout.exception.http.NotFoundException;
import com.jinkyumpark.bookitout.user.LoginAppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
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

    public Long addMemo(MemoAddRequest memoAddRequest, Book book) {
        return memoRepository.save(memoAddRequest.toEntity(book)).getMemoId();
    }

    @Transactional
    public void editMemo(Long memoId, MemoEditRequest memoEditRequest, LoginAppUser loginAppUser) {
        Memo existingMemo = memoRepository.findById(memoId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("memo.edit.fail.not-found")));

        existingMemo.editMemo(memoEditRequest.getContent(), memoEditRequest.getPage());
    }

    @Transactional
    public void deleteMemo(Long memoId, LoginAppUser loginAppUser) {
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("memo.delete.fail.not-found")));

        memoRepository.deleteById(memoId);
    }
}
