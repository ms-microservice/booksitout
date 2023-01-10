package com.jinkyumpark.bookitout.app.goal;

import com.jinkyumpark.bookitout.app.goal.response.GoalResponse;
import com.jinkyumpark.bookitout.app.user.LoginAppUser;
import com.jinkyumpark.bookitout.app.user.LoginUser;
import com.jinkyumpark.bookitout.response.AddSuccessResponse;
import com.jinkyumpark.bookitout.response.DeleteSuccessResponse;
import com.jinkyumpark.bookitout.response.EditSuccessResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController @RequestMapping("/v1/goal")
public class GoalControllerV1 {
    private final GoalService goalService;

    @GetMapping("{year}")
    public GoalResponse getGoalByYear(@PathVariable(value = "year", required = false) Integer year, @LoginUser LoginAppUser loginAppUser) {
        if (year == null) year = LocalDateTime.now().getYear();

        Goal goal = goalService.getGoalByYear(year, loginAppUser);

        return new GoalResponse(goal.getGoalId().getYear(), goal.getGoal(), goal.getCurrent());
    }

    @GetMapping
    public List<GoalResponse> getGoalByDuration(@RequestParam(value = "duration", required = false) Integer duration, @LoginUser LoginAppUser loginAppUser) {
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
    public AddSuccessResponse addGoal(
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "goal") Integer goal,
            @LoginUser LoginAppUser loginAppUser
    ) {
        if (year == null) year = LocalDateTime.now().getYear();

        GoalId goalId = new GoalId(loginAppUser.getId(), year);
        Goal newGoal = new Goal(goalId, goal, loginAppUser.getId());

        goalService.addGoal(loginAppUser.getId(), newGoal);

        return new AddSuccessResponse(String.format("POST v1/goal/%d/%d", year, goal), "목표를 설정했어요");
    }

    @PutMapping("{year}")
    public EditSuccessResponse editGoal(
            @PathVariable("year") Integer year,
            @RequestParam("goal") Integer goal,
            @LoginUser LoginAppUser loginAppUser
    ) {
        GoalId goalId = new GoalId(loginAppUser.getId(), year);
        Goal editedGoal = new Goal(goalId, goal, loginAppUser.getId());

        goalService.editGoal(editedGoal);

        return new EditSuccessResponse(String.format("PUT v1/goal/%d?goal=%d", year, goal), String.format("%d년의 목표를 %d로 수정했어요", year, goal));
    }

    @DeleteMapping("{year}")
    public DeleteSuccessResponse deleteGoal(@PathVariable("year") Integer year, @LoginUser LoginAppUser loginAppUser) {
        goalService.deleteGoal(loginAppUser.getId(), year);

        return new DeleteSuccessResponse(String.format("DELETE v1/goal/%d", year), "목표를 지웠어요");
    }
}
