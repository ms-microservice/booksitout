package com.jinkyumpark.search.settings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SettingsRepository extends JpaRepository<Settings, Long> {

    @Query("select s from Settings s where s.appUserId = ?1")
    Optional<Settings> findByAppUserId(Long appUserId);

}
