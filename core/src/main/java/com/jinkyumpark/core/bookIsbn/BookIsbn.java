package com.jinkyumpark.core.bookIsbn;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table
public class BookIsbn {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookIsbnId;

    private Integer isbn13;
    private String title;
    private String author;
    private String cover;

}