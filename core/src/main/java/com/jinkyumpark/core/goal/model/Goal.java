package com.jinkyumpark.core.goal.model;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@NoArgsConstructor

@DynamicInsert
@Entity(name = "Goal") @Table(name = "goal")
public class Goal {
    @EmbeddedId
    private GoalId goalId;

    @Column(nullable = false)
    private Integer goal;

    @Builder
    public Goal(GoalId goalId, Integer goal) {
        this.goalId = goalId;
        this.goal = goal;
    }

    public void editGoal(Integer goal) {
        this.goal = goal;
    }
}