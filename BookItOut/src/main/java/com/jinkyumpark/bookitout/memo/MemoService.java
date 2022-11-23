package com.jinkyumpark.bookitout.memo;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class MemoService {
    private MemoRepository memoRepository;

    public List<Memo> getAllMemoByBookId(Long bookId) {
        return memoRepository.findAllByBook_BookId(bookId);
    }
}
