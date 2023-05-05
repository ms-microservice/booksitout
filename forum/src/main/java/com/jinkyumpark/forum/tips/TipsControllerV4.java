package com.jinkyumpark.forum.tips;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("v4/forum/tips")
@RestController
public class TipsControllerV4 {

    private final TipsService tipsService;

    @GetMapping("{type}")
    public List<TipsDto> getTipsByTipsType(@PathVariable("type") String type,
                                           @RequestParam("page") Integer page,
                                           @RequestParam("size") Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page, size);

        if (type.equalsIgnoreCase("all")) {
            return tipsService.getAllTips(pageable);
        }

        TipsType requestedType = TipsType.valueOf(type);
        return tipsService.getTipsByType(pageable, requestedType);
    }

}
