package com.jinkyumpark.bookitout.app.memo;

import com.jinkyumpark.bookitout.app.book.model.Book;
import com.jinkyumpark.bookitout.app.memo.request.MemoAddRequest;
import com.jinkyumpark.bookitout.app.memo.request.MemoEditRequest;
import com.jinkyumpark.bookitout.exception.common.NotFoundException;
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
    public void editMemo(Long memoId, MemoEditRequest memoEditRequest) {
        Memo existingMemo = memoRepository.findById(memoId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("memo.edit.fail.not-found")));

        existingMemo.editMemo(memoEditRequest.getContent(), memoEditRequest.getPage());
    }

    public void deleteMemo(Long memoId) {
        Memo memo = memoRepository.findById(memoId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("memo.delete.fail.not-found")));

        memoRepository.deleteById(memoId);
    }
}
