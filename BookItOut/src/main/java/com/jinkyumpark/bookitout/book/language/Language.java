package com.jinkyumpark.bookitout.book.language;

import javax.persistence.*;

@Entity(name = "language")
@Table(name = "Language", uniqueConstraints = {
        @UniqueConstraint(name = "language_name_unique", columnNames = "name")
})
public class Language {
    @Id
    @SequenceGenerator(name = "language_seq", sequenceName = "language_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "language_seq")
    private Long id;

    @Column(name = "name", unique = true, nullable = false)
    private String name;

    @Column(name = "icon", nullable = false)
    private String icon;

    @Column(name = "spoken_population")
    private Integer spokenPopulation;
}
