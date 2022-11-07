package com.jinkyumpark.bookitout.bookelement.author.nationality;

import javax.persistence.*;

@Entity
@Table(name = "Nationality")
public class Nationality {
    @Id
    @SequenceGenerator(name = "nationality_seq", sequenceName = "nationality_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "nationality_seq")
    @Column(name = "nationality_id")
    private Long nationalityId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image", nullable = false)
    private String image;
}