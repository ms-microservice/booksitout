package com.jinkyumpark.library.libraryBook;

import com.jinkyumpark.library.library.Library;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity @Table(
        uniqueConstraints = {
                @UniqueConstraint(name = "library_book_isbn_library_unique", columnNames = {"isbn", "library_id"})
        }
)
public class LibraryBook {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long libraryBookId;

    @Column(name = "isbn", length = 13)
    private Long isbn;

    @ManyToOne @JoinColumn(name = "library_id", nullable = false)
    private Library library;

}