package com.jinkyumpark.community.gathering.join;

import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.common.exception.UnauthorizedException;
import com.jinkyumpark.community.gathering.Gathering;
import com.jinkyumpark.community.gathering.GatheringRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class GatheringJoinService {

    private final GatheringJoinRepository gatheringJoinRepository;
    private final GatheringRepository gatheringRepository;

    public int getJoinCount(Long gatheringId) {
        return gatheringJoinRepository.countAllByGatheringId(gatheringId);
    }

    public Page<GatheringJoin> getAllByGatheringId(Long gatheringId, Pageable pageable) {
        return gatheringJoinRepository.findAllByGatheringId(gatheringId, pageable);
    }

    public Page<GatheringJoin> getAllByAppUserId(Long appUserId, Pageable pageable) {
        return gatheringJoinRepository.findAllByAppUserId(appUserId, pageable);
    }

    public GatheringJoin addGatheringJoin(GatheringJoin gatheringJoin) {
        return gatheringJoinRepository.save(gatheringJoin);
    }

    @Transactional
    public GatheringJoin update(GatheringJoin gatheringJoinToUpdate) {
        GatheringJoin existingGatheringJoin = gatheringJoinRepository.findById(gatheringJoinToUpdate.getGatheringId())
                .orElseThrow(() -> new NotFoundException(""));

        if (!existingGatheringJoin.getAppUserId().equals(gatheringJoinToUpdate.getAppUserId())) {
            throw new UnauthorizedException("");
        }

        return existingGatheringJoin.update(gatheringJoinToUpdate);
    }

    @Transactional
    public GatheringJoin updateStatus(Long gatheringJoinId, Long appUserId, GatheringJoinStatus status) {
        GatheringJoin existingGatheringJoin = gatheringJoinRepository.findById(gatheringJoinId)
                .orElseThrow(() -> new NotFoundException(""));

        Gathering existingGathering = gatheringRepository.findById(existingGatheringJoin.getGatheringId())
                .orElseThrow(() -> new NotFoundException(""));

        if (!existingGathering.getAppUserId().equals(appUserId)) {
            throw new UnauthorizedException("");
        }

        return existingGatheringJoin.updateStatus(status);
    }

    public void delete(GatheringJoin gatheringJoin) {
        GatheringJoin existingGatheringJoin = gatheringJoinRepository.findById(gatheringJoin.getGatheringJoinId())
                .orElseThrow(() -> new NotFoundException(""));

        if (!existingGatheringJoin.getAppUserId().equals(gatheringJoin.getAppUserId())) {
            throw new UnauthorizedException("");
        }

        gatheringJoinRepository.deleteById(gatheringJoin.getGatheringJoinId());
    }

}
