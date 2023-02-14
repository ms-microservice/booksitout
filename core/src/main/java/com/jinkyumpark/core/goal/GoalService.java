package com.jinkyumpark.core.goal;

import com.jinkyumpark.core.statistics.model.MonthStatistics;
import com.jinkyumpark.core.statistics.StatisticsService;
import com.jinkyumpark.core.user.login.LoginAppUser;
import com.jinkyumpark.core.common.exception.http.NotFoundException;
import com.jinkyumpark.core.goal.model.Goal;
import com.jinkyumpark.core.goal.model.GoalId;
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