package com.jinkyumpark.bookitout.app.goal;

import com.jinkyumpark.bookitout.app.user.AppUser;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter @EqualsAndHashCode

@Entity(name = "Goal")
@Table(name = "goal")
public class Goal {
    @SequenceGenerator(name = "goal_seq", sequenceName = "goal_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "goal_seq")
    @Column(name = "goal_id", updatable = false)
    @Id
    private Long goalId;

    private Integer year;
    private Integer goal;

    @ManyToOne
    @JoinColumn(name = "app_user_id", referencedColumnName = "app_user_id", updatable = false, foreignKey = @ForeignKey(name = "goal_app_user_fk"))
    private AppUser appUser;
}