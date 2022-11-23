package com.jinkyumpark.bookitout.memo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/memo")
public class MemoControllerV1 {
    private MemoService memoService;

    public MemoControllerV1(MemoService memoService) {
        this.memoService = memoService;
    }
}
