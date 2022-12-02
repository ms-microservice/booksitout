package com.jinkyumpark.bookitout.app.goal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.app.user.AppUser;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @EqualsAndHashCode

@Entity(name = "Goal")
@Table(name = "goal")
public class Goal {
    @EmbeddedId
    private GoalId goalId;

    @JsonIgnore
    @ManyToOne
    @MapsId("appUserId")
    @JoinColumn(name = "app_user_id", referencedColumnName = "app_user_id", updatable = false, foreignKey = @ForeignKey(name = "goal_app_user_fk"))
    private AppUser appUser;

    private Integer goal;
}