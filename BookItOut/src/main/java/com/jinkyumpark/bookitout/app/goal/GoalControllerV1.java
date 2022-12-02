package com.jinkyumpark.bookitout.app.goal;

import com.jinkyumpark.bookitout.app.user.AppUser;
import com.jinkyumpark.bookitout.app.user.AppUserService;
import com.jinkyumpark.bookitout.response.AddSuccessResponse;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@RestController
@RequestMapping("/v1/goal")
public class GoalControllerV1 {
    private final GoalService goalService;

    @GetMapping("{year}")
    public Goal getGoalByYear(@PathVariable(value = "year", required = false) Integer year) {
        if (year == null) year = LocalDateTime.now().getYear();

        Long loginUserId = AppUserService.getLoginAppUserId();

        return goalService.getGoalByYear(loginUserId, year);
    }

    @PostMapping
    public AddSuccessResponse addGoal(
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "goal") Integer goal
    ) {
        if (year == null) year = LocalDateTime.now().getYear();

        Long loginUserId = AppUserService.getLoginAppUserId();
        GoalId goalId = new GoalId(loginUserId, year);
        Goal newGoal = new Goal(goalId, new AppUser(loginUserId), goal);

        goalService.addGoal(newGoal);

        return new AddSuccessResponse(String.format("POST v1/goal/%d/%d", year, goal), "목표를 설정했어요");
    }
}
