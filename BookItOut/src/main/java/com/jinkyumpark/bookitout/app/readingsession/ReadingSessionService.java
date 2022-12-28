package com.jinkyumpark.bookitout.app.readingsession;

import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ReadingSessionService {
    private ReadingSessionRepository readingSessionRepository;

    public List<Integer> getReadTimeByDateRange(
            Long appUserId,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        List<ReadingSession> readingSessionList = readingSessionRepository.findAllByAppUser_AppUserIdAndStartTimeBetween(appUserId, startDate, endDate);

        List<Integer> readingTimeList = new ArrayList<>();
        for (int i = startDate.getDayOfYear(); i <= endDate.getDayOfYear(); i++) {
            int finalI = i;
            Integer totalReadTime = Math.toIntExact(readingSessionList.stream()
                    .filter(r -> r.getStartTime().getDayOfYear() == finalI)
                    .mapToLong(r -> r.getReadTime() == null ? 0 : r.getReadTime())
                    .sum());

            readingTimeList.add(totalReadTime);
        }

        return readingTimeList;
    }

    public List<ReadingSession> getReadingSessionByBookId(Long bookId) {
        return readingSessionRepository.findAllByBook_BookId(bookId);
    }

    public ReadingSession getCurrentReadingSession(Long appUserId) {
        return readingSessionRepository.findFirstByAppUser_AppUserIdAndEndTimeIsNullOrderByStartTimeDesc(appUserId)
                .orElseThrow(() -> new NotFoundException("진행중인 독서활동이 없어요"));
    }

    public Optional<ReadingSession> getCurrentReadingSessionOptional(Long appUserId) {
        return readingSessionRepository.findFirstByAppUser_AppUserIdAndEndTimeIsNullOrderByStartTimeDesc(appUserId);
    }

    public void addReadingSession(ReadingSession newReadingSession) {
        readingSessionRepository.save(newReadingSession);
    }

    public void deleteReadingSession(Long readingSessionId) {
        readingSessionRepository.deleteById(readingSessionId);
    }

    public Optional<ReadingSession> getReadingSessionOptionalByReadingSessionId(Long readingSessionId) {
        return readingSessionRepository.findById(readingSessionId);
    }

    @Transactional
    public void updateReadingSession(ReadingSession updatedReadingSession) {
        Optional<ReadingSession> readingSessionOptional = readingSessionRepository.findById(updatedReadingSession.getReadingSessionId());

        if (readingSessionOptional.isEmpty()) {
            throw new NotFoundException("찾을 수 없어요");
        }

        ReadingSession readingSession = readingSessionOptional.get();
        readingSession.setEndTime(updatedReadingSession.getEndTime());
        readingSession.setEndPage(updatedReadingSession.getEndPage());
    }

    public List<ReadingSession> getRecentReadingSessions(Long appUserId, Pageable pageRequest) {
        return readingSessionRepository.findAllRecentReadingSession(appUserId, pageRequest);
    }
}
