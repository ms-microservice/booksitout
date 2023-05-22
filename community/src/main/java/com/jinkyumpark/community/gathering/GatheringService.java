package com.jinkyumpark.community.gathering;

import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.common.exception.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class GatheringService {

    private final GatheringRepository gatheringRepository;

    public List<Gathering> getAllGatheringByType(GatheringType gatheringType, Pageable pageable) {
        return gatheringRepository.findAllByType(gatheringType, pageable);
    }

    public Gathering getGatheringById(Long gatheringId) {
        return gatheringRepository.findById(gatheringId)
                .orElseThrow(() -> new NotFoundException("no gathering found"));
    }

    public Gathering addGathering(Gathering gatheringToAdd) {
        return gatheringRepository.save(gatheringToAdd);
    }

    @Transactional
    public Gathering updateGathering(Gathering updatedGathering, Long appUserId) {
        Gathering existingGathering = gatheringRepository.findById(updatedGathering.getGatheringId())
                .orElseThrow(() -> new NotFoundException("gathering to update not found"));

        if (!existingGathering.getAppUserId().equals(appUserId)) {
            throw new UnauthorizedException("gathering can only be updated by its publisher");
        }

        return existingGathering.update(updatedGathering);
    }

    public void deleteGathering(Long gatheringId, Long appUserId) {
        Gathering existingGathering = gatheringRepository.findById(gatheringId)
                .orElseThrow(() -> new NotFoundException("Gathering not found to delete"));

        if (!existingGathering.getGatheringId().equals(appUserId)) {
            throw new UnauthorizedException("Gathering can only be deleted by its publisher");
        }

        gatheringRepository.deleteById(gatheringId);
    }

}
