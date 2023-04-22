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
    @ColumnDefault("0")
    private Integer current;

    @Builder
    public Goal(GoalId goalId, Integer goal, Long appUserId) {
        this.goalId = goalId;
        this.goal = goal;
    }

    public void addReadingSession(ReadingSessionDto readingSessionDto, Book book) {
        if (readingSessionDto.getEndPage() != null && book.getEndPage().equals(readingSessionDto.getEndPage())) this.current++;
    }

    public void updateReadingSession(ReadingSessionDto readingSessionDto, Book book) {
        if (readingSessionDto.getEndPage().equals(book.getEndPage())) this.current++;
    }

    public void deleteReadingSession(ReadingSession readingSession, Book book) {
        if (readingSession.getEndPage() != null && readingSession.getEndPage().equals(book.getEndPage())) this.current--;
    }

    public void deleteDoneBook() {
        this.current--;
    }

    public void setNewCurrent(Integer current) {
        this.current = current;
    }

    public void editGoal(Integer goal) {
        this.goal = goal;
    }
}