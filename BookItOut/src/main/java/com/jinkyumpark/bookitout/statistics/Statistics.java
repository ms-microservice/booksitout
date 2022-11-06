package com.jinkyumpark.bookitout.statistics;

import com.jinkyumpark.bookitout.user.AppUser;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "statistics")
@Table(name = "Statistics")
public class Statistics {
    @SequenceGenerator(name = "statistics_seq", sequenceName = "statistics_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "statistics_seq")
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "appuser", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name = "statistics_user_fk"))
    private AppUser appUser;

    @Column(name = "year")
    private Integer year;
    @Column(name = "month")
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
}
