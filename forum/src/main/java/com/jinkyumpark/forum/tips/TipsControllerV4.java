package com.jinkyumpark.forum.tips;

import com.jinkyumpark.forum.tips.dto.TipsDto;
import com.jinkyumpark.forum.tips.dto.TipsSimplePaged;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("v4/forum/tips")
@RestController
public class TipsControllerV4 {

    private final TipsService tipsService;

    @GetMapping
    public TipsSimplePaged getTipsByTipsType(@RequestParam("type") String type,
                                             @RequestParam(value = "page", required = false) Integer page,
                                             @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdDate").descending());

        if (type.equalsIgnoreCase("all")) {
            return tipsService.getAllSimpleTips(pageable);
        }

        TipsType requestedType = TipsType.valueOf(type.toUpperCase());
        return tipsService.getTipsSimpleByType(pageable, requestedType);
    }

    @GetMapping("{tipsId}")
    public TipsDto getTipsByTipsId(@PathVariable("tipsId") Long tipsId) {
        return tipsService.getTipsByTipsId(tipsId);
    }

    @AdminOnly
    @PostMapping
    public AddSuccessResponse addTips(@RequestBody @Valid TipsAddRequest tipsAddRequest) {
        Long tipsId = tipsService.addTips(tipsAddRequest.toEntity());

        return AddSuccessResponse.builder()
                .id(tipsId)
                .message("꿀팁을 추가헀어요")
                .build();
    }

}
