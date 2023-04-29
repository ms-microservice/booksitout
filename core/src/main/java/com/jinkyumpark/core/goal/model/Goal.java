package com.jinkyumpark.core.goal.model;

import com.jinkyumpark.core.book.model.Book;
import com.jinkyumpark.core.reading.ReadingSession;
import com.jinkyumpark.core.reading.dto.ReadingSessionDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Getter
@NoArgsConstructor

@DynamicInsert
@Entity(name = "Goal") @Table(name = "goal")
public class Goal {
    @EmbeddedId
    private GoalId goalId;

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