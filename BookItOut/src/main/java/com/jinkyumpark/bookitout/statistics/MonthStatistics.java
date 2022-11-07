package com.jinkyumpark.bookitout.statistics;

import com.jinkyumpark.bookitout.user.AppUser;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "month_statistics")
@Table(name = "MonthStatistics")
public class MonthStatistics {
    @SequenceGenerator(name = "statistics_seq", sequenceName = "statistics_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "statistics_seq")
    @Column(name = "month_statistics_id")
    @Id
    private Long monthStatisticsId;

    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name = "month", nullable = false)
    private Integer month;

    @Column(name = "total_read_minute")
    private Integer totalReadMinute;

    @Column(name = "finished_book")
    private Integer finishedBook;

    @Column(name = "total_star")
    private Integer totalStar;

    @Column(name = "max_read_minute")
    private Integer maxReadMinute;

    @Column(name = "total_page")
    private Integer totalPage;

    // FK
    @ManyToOne
    @JoinColumn(name = "app_user_id", nullable = false, foreignKey = @ForeignKey(name = "statistics_app_user_fk"))
    private AppUser appUser;
}