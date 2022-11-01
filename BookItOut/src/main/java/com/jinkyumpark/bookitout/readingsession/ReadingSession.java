package com.jinkyumpark.bookitout.readingsession;

import com.jinkyumpark.bookitout.user.AppUser;
import com.jinkyumpark.bookitout.userbook.UserBook;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "readingsession")
@Table(name = "ReadingSession")
public class ReadingSession {
    @Id
    @SequenceGenerator(name = "reading_session_seq", sequenceName = "reading_session_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reading_session_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reading_session_user_id", referencedColumnName = "id", updatable = false, foreignKey = @ForeignKey(name = "reading_session_user_fk"))
    private AppUser appUser;

    @ManyToOne
    @JoinColumn(name = "reading_session_book_id", referencedColumnName = "id", updatable = false, foreignKey = @ForeignKey(name = "reading_session_book_fk"))
    private UserBook userBook;

    @Column(name = "start_page")
    private Integer startPage;

    @Column(name = "end_page")
    private Integer endPage;

    @Generated(GenerationTime.INSERT)
    @Column(name = "start_time", updatable = false, insertable = false, nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;
}
