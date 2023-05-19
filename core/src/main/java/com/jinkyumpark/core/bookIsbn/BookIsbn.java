package com.jinkyumpark.core.bookIsbn;

import com.jinkyumpark.core.common.feign.response.NewBookSearchResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(uniqueConstraints = {@UniqueConstraint(name = "book_isbn_unique", columnNames = {"isbn13"})})
public class BookIsbn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookIsbnId;

    @Column(unique = true)
    private Long isbn13;

    private String title;
    private String author;
    private String cover;


    public static BookIsbn of(NewBookSearchResponse newBookSearchResponse) {
        int index = newBookSearchResponse.getTitle().lastIndexOf('(') == -1 ? newBookSearchResponse.getTitle().length() : newBookSearchResponse.getTitle().lastIndexOf('(');

        return BookIsbn.builder()
                .isbn13(Long.parseLong(newBookSearchResponse.getIsbn()))
                .title(newBookSearchResponse.getTitle().substring(0, index))
                .author(newBookSearchResponse.getAuthor())
                .cover(newBookSearchResponse.getCover())
                .build();
    }

}