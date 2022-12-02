package com.jinkyumpark.bookitout.app.goal;

import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface GoalRepository extends PagingAndSortingRepository<Goal, Long> {
    Optional<Goal> findByGoalId(GoalId goalId);
}
