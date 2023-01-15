package com.jinkyumpark.bookitout.service;

import com.jinkyumpark.bookitout.model.statistics.MonthStatistics;
import com.jinkyumpark.bookitout.user.LoginAppUser;
import com.jinkyumpark.bookitout.exception.http.NotFoundException;
import com.jinkyumpark.bookitout.model.goal.Goal;
import com.jinkyumpark.bookitout.model.goal.GoalId;
import com.jinkyumpark.bookitout.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class GoalService {
    private final MessageSourceAccessor messageSource;
    private final GoalRepository goalRepository;
    private final StatisticsService statisticsService;

    public Goal getGoalByYear(Integer year, LoginAppUser loginAppUser) {
        GoalId goalId = new GoalId(loginAppUser.getId(), year);
        Goal goal = goalRepository.findByGoalId(goalId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("goal.get.fail.not-found")));

        if (goal.getGoal() <= 0) throw new IllegalStateException(messageSource.getMessage("goal.get.fail.too-small"));

        return goal;
    }

    public List<Goal> getGoalByStartYearAndEndYear(Integer startYear, Integer endYear, LoginAppUser loginAppUser) {
        return goalRepository.findGoalsBetween(loginAppUser.getId(), startYear, endYear);
    }

    @Transactional
    public void addGoal(Long appUserId, Goal newGoal) {
        List<MonthStatistics> monthStatisticsList = statisticsService.getStatisticsByYear(appUserId, newGoal.getGoalId().getYear());
        Integer totalBookReadDuringYear = monthStatisticsList.stream().mapToInt(MonthStatistics::getFinishedBook).sum();

        newGoal.setNewCurrent(totalBookReadDuringYear);

        goalRepository.save(newGoal);
    }

    @Transactional
    public void editGoal(Goal editedGoal) {
        Goal goal = goalRepository.findByGoalId(editedGoal.getGoalId())
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("goal.edit.fail.not-found")));

        goal.editGoal(editedGoal.getGoal());
    }

    public void deleteGoal(Long loginUserId, Integer year) {
        GoalId goalId = new GoalId(loginUserId, year);
        Goal goal = goalRepository.findByGoalId(goalId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("goal.delete.fail.not-found")));

        goalRepository.deleteByGoalId(goalId);
    }
}