package com.jinkyumpark.bookitout.author.nationality;

import javax.persistence.*;

@Entity(name = "nationality")
@Table(name = "Nationality")
public class Nationality {
    @Id
    @SequenceGenerator(name = "nationality_seq", sequenceName = "nationality_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "nationality_seq")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image", nullable = false)
    private String image;
}