package com.jinkyumpark.core.goal;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.core.book.BookService;
import com.jinkyumpark.core.goal.model.Goal;
import com.jinkyumpark.core.goal.model.GoalId;
import com.jinkyumpark.core.loginUser.LoginAppUser;
import com.jinkyumpark.core.loginUser.LoginUser;
import com.jinkyumpark.core.goal.model.Goal;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController @RequestMapping("/v1/goal")
public class GoalControllerV1 {
    private final MessageSourceAccessor messageSource;
    private final GoalService goalService;

    @GetMapping("{year}")
    public GoalResponse getGoalByYear(@PathVariable(value = "year", required = false) Integer year,
                                      @LoginUser LoginAppUser loginAppUser) {
        if (year == null) year = LocalDateTime.now().getYear();

        Goal goal = goalService.getGoalByYear(year, loginAppUser);

        return new GoalResponse(goal.getGoalId().getYear(), goal.getGoal(), goal.getCurrent());
    }

    @GetMapping
    public List<GoalResponse> getGoalByDuration(@RequestParam(value = "duration", required = false) Integer duration,
                                                @LoginUser LoginAppUser loginAppUser) {
        if (duration == null) duration = 5;

        Integer endYear = LocalDateTime.now().getYear();
        Integer startYear = endYear - duration;

        return goalService
                .getGoalByStartYearAndEndYear(startYear, endYear, loginAppUser)
                .stream()
                .map(goal -> new GoalResponse(goal.getGoalId().getYear(), goal.getGoal(), goal.getCurrent()))
                .collect(Collectors.toList());
    }

    @PostMapping
    public AddSuccessResponse addGoal(@RequestParam(value = "year", required = false) Integer year,
                                      @RequestParam(value = "goal") Integer goal,
                                      @LoginUser LoginAppUser loginAppUser) {
        if (year == null) year = LocalDateTime.now().getYear();

        GoalId goalId = new GoalId(loginAppUser.getId(), year);
        Goal newGoal = new Goal(goalId, goal, loginAppUser.getId());

        goalService.addGoal(loginAppUser.getId(), newGoal);

        return AddSuccessResponse.builder()
                .message(messageSource.getMessage("goal.add.success"))
                .path(String.format("POST v1/goal/%d/%d", year, goal))
                .build();
    }

    @PutMapping("{year}")
    public UpdateSuccessResponse editGoal(@PathVariable("year") Integer year,
                                          @RequestParam("goal") Integer goal,
                                          @LoginUser LoginAppUser loginAppUser) {
        GoalId goalId = new GoalId(loginAppUser.getId(), year);
        Goal editedGoal = new Goal(goalId, goal, loginAppUser.getId());

        goalService.editGoal(editedGoal);

        return UpdateSuccessResponse.builder()
                .message(messageSource.getMessage("goal.edit.success"))
                .build();
    }

    @DeleteMapping("{year}")
    public DeleteSuccessResponse deleteGoal(@PathVariable("year") Integer year,
                                            @LoginUser LoginAppUser loginAppUser) {
        goalService.deleteGoal(loginAppUser.getId(), year);

        return DeleteSuccessResponse.builder()
                .message(messageSource.getMessage("goal.delete.success"))
                .build();
    }
}
