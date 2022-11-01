package com.jinkyumpark.bookitout.author;

import com.jinkyumpark.bookitout.nationality.Nationality;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "Author")
@Table(name = "author")
public class Author {
    @Id
    @SequenceGenerator(name = "author_seq", sequenceName = "author_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "author_seq")
    @Column(name = "id")
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "nationality_id", nullable = false, referencedColumnName = "id", foreignKey = @ForeignKey(name = "author_nationality_fk"))
    private Nationality nationality;

    @Column(name = "birthdate", nullable = true)
    private LocalDateTime birthDate;
}
