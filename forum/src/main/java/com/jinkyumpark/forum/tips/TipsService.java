package com.jinkyumpark.forum.tips;

import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.forum.tips.dto.TipsDto;
import com.jinkyumpark.forum.tips.dto.TipsSimple;
import com.jinkyumpark.forum.tips.dto.TipsSimplePaged;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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

    public TipsSimplePaged getAllSimpleTips(Pageable pageable) {
        Page<Tips> tipsPaged = tipsRepository.findAllPaged(pageable);

        List<TipsSimple> content = tipsPaged.stream()
                .map(TipsSimple::of)
                .collect(Collectors.toList());

        return TipsSimplePaged.builder()
                .totalPages(tipsPaged.getTotalPages())
                .hasMore(tipsPaged.hasNext())
                .content(content)
                .build();
    }

    public List<TipsDto> getTipsByType(Pageable pageable, TipsType tipsType) {
        return tipsRepository.findByTipsType(pageable, tipsType).getContent().stream()
                .map(TipsDto::of)
                .collect(Collectors.toList());
    }

    public TipsSimplePaged getTipsSimpleByType(Pageable pageable, TipsType tipsType) {
        Page<Tips> tipsPaged = tipsRepository.findByTipsType(pageable, tipsType);

        List<TipsSimple> content = tipsRepository.findByTipsType(pageable, tipsType).stream()
                .map(TipsSimple::of)
                .collect(Collectors.toList());

        return TipsSimplePaged.builder()
                .totalPages(tipsPaged.getTotalPages())
                .hasMore(tipsPaged.hasNext())
                .content(content)
                .build();
    }

    public TipsDto getTipsByTipsId(Long tipsId) {
        Tips tips = tipsRepository.findById(tipsId)
                .orElseThrow(() -> new NotFoundException("해당 꿀팁이 없어요"));

        return TipsDto.of(tips);
    }

    public Long addTips(Tips tips) {
        return tipsRepository.save(tips).getTipsId();
    }

    public void editTips(TipsDto editedTips) {
        Tips tips = tipsRepository.findById(editedTips.getId())
                .orElseThrow(() -> new NotFoundException("수정하려는 꿀팁이 없어요"));

        tips.editTips(editedTips);
    }

    public void deleteTips(Long tipsId) {
        tipsRepository.deleteById(tipsId);
    }

}