package com.jinkyumpark.core.reading;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ReadingSessionRepository extends JpaRepository<ReadingSession, Long> {
    @Query("select r from ReadingSession r join fetch r.book where r.appUserId = ?1 and r.book.currentPage < r.book.endPage and (r.book.isGiveUp = false or r.book.isGiveUp is null) order by r.endTime desc")
    List<ReadingSession> findAllBookNotDoneReadingSession(Long appUserId, Pageable pageable);

    List<ReadingSession> findAllByAppUserIdAndStartTimeBetween(Long appUserId, LocalDateTime startTime, LocalDateTime endTime);

    List<ReadingSession> findAllByBook_BookId(Long bookId);

    @Query("select r from ReadingSession r where r.appUserId = ?1 order by r.startTime DESC")
    List<ReadingSession> findAllRecentReadingSession(Long appUserId, Pageable pageable);

    Optional<ReadingSession> findFirstByAppUserIdAndEndTimeIsNullOrderByStartTimeDesc(Long appUserId);

    @Query("select r from ReadingSession r join fetch r.book where r.appUserId = ?1 and r.endTime is null order by r.startTime DESC")
    Optional<ReadingSession> getCurrentReadingSessionEager(Long appUserId);

    Optional<ReadingSession> findFirstByBook_BookIdOrderByStartTimeDesc(Long bookId);
}