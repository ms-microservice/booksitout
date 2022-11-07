package com.jinkyumpark.bookitout.readingsession;

import com.jinkyumpark.bookitout.user.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Service
public class ReadingSessionService {
    private ReadingSessionRepository readingSessionRepository;

    public List<Integer> getReadTimeByDateRange(
            AppUser user,
            LocalDateTime startDate,
            LocalDateTime endDate
            ) {
        List<ReadingSession> readingSessionList = readingSessionRepository.findAllByAppUserAndStartTimeBetween(user, startDate, endDate);

        List<Integer> readingTimeList = new ArrayList<>();
        for (int i = startDate.getDayOfYear(); i <= endDate.getDayOfYear(); i++) {
            int finalI = i;
            Integer totalReadTime = Math.toIntExact(readingSessionList.stream()
                    .filter(r -> r.getStartTime().getDayOfYear() == finalI)
                    .mapToLong(r -> Duration.between(r.getStartTime(), r.getEndTime()).toMinutes())
                    .sum());

            readingTimeList.add(totalReadTime);
        }

        return readingTimeList;
    }
}
