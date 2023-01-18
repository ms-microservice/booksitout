package com.jinkyumpark.bookitout.goal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.book.model.Book;
import com.jinkyumpark.bookitout.reading.ReadingSession;
import com.jinkyumpark.bookitout.reading.dto.ReadingSessionDto;
import com.jinkyumpark.bookitout.user.AppUser;
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

    @ManyToOne
    @MapsId("appUserId")
    @JoinColumn(name = "app_user_id", referencedColumnName = "app_user_id", updatable = false, foreignKey = @ForeignKey(name = "goal_app_user_fk"))
    @JsonIgnore
    private AppUser appUser;

    private Integer goal;
    @ColumnDefault("0")
    private Integer current;

    @Builder
    public Goal(GoalId goalId, Integer goal, Long appUserId) {
        this.goalId = goalId;
        this.goal = goal;
        this.appUser = new AppUser(appUserId);
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