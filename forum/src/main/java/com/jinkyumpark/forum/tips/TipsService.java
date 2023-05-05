package com.jinkyumpark.forum.tips;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TipsService {

    private final TipsRepository tipsRepository;

    public List<TipsDto> getAllTips(Pageable pageable) {
        return tipsRepository.findAll(pageable).stream()
                .map(TipsDto::of)
                .collect(Collectors.toList());
    }

    public List<TipsDto> getTipsByType(Pageable pageable, TipsType tipsType) {
        return tipsRepository.findByTipsType(pageable, tipsType).stream()
                .map(TipsDto::of)
                .collect(Collectors.toList());
    }

}