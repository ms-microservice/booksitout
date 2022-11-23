package com.jinkyumpark.bookitout.memo;

import org.springframework.stereotype.Service;

@Service
public class MemoService {
    private MemoRepository memoRepository;

    public MemoService(MemoRepository memoRepository) {
        this.memoRepository = memoRepository;
    }
}
