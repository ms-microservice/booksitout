package com.jinkyumpark.core.goal;

import com.jinkyumpark.common.exception.NoContentException;
import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.core.goal.model.Goal;
import com.jinkyumpark.core.goal.model.GoalId;
import com.jinkyumpark.core.loginUser.LoginAppUser;
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

    public Goal getGoalByYear(Integer year, LoginAppUser loginAppUser) {
        GoalId goalId = new GoalId(loginAppUser.getId(), year);
        Goal goal = goalRepository.findByGoalId(goalId)
                .orElseThrow(() -> new NoContentException(messageSource.getMessage("goal.get.fail.not-found")));

        if (goal.getGoal() <= 0) throw new IllegalStateException(messageSource.getMessage("goal.get.fail.too-small"));

        return goal;
    }

    public List<Goal> getGoalByStartYearAndEndYear(Integer startYear, Integer endYear, LoginAppUser loginAppUser) {
        return goalRepository.findGoalsBetween(loginAppUser.getId(), startYear, endYear);
    }

    @Transactional
    public void addGoal(Goal newGoal) {
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
        goalRepository.findByGoalId(goalId)
                .orElseThrow(() -> new NotFoundException(messageSource.getMessage("goal.delete.fail.not-found")));

        goalRepository.deleteByGoalId(goalId);
    }
}