package com.jinkyumpark.bookitout.readingsession;

import com.jinkyumpark.bookitout.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReadingSessionRepository extends JpaRepository<ReadingSession, Long> {
    Optional<ReadingSession> findTopByAppUser_AppUserIdOrderByEndTimeDesc(Long appUserId);
    List<ReadingSession> findAllByAppUserAndStartTimeBetween(AppUser appUser, LocalDateTime startTime, LocalDateTime endTime);
}
