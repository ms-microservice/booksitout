package com.jinkyumpark.bookitout.app.goal;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@NoArgsConstructor @AllArgsConstructor
@Getter @Setter @EqualsAndHashCode
@Embeddable
public class GoalId implements Serializable {
    @Column(name = "app_user_id")
    private Long appUserId;

    @Column(name = "year")
    private Integer year;
}