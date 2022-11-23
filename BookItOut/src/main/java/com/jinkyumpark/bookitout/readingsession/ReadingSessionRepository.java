package com.jinkyumpark.bookitout.readingsession;

import com.jinkyumpark.bookitout.user.AppUser;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReadingSessionRepository extends JpaRepository<ReadingSession, Long> {
    Optional<ReadingSession> findTopByAppUser_AppUserIdOrderByEndTimeDesc(Long appUserId);
    List<ReadingSession> findAllByAppUser_AppUserIdAndStartTimeBetween(Long appUserId, LocalDateTime startTime, LocalDateTime endTime);

    List<ReadingSession> findAllByBook_BookId(Long bookId);

    @Query("select r from ReadingSession r where r.appUser.appUserId = ?1 order by r.startTime DESC")
    List<ReadingSession> findAllRecentReadingSession(Long appUserId, Pageable pageable);

    Optional<ReadingSession> findFirstByAppUser_AppUserIdAndEndTimeIsNullOrderByStartTimeDesc(Long appUserId);

}
