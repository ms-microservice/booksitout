package com.jinkyumpark.library.libraryBook;

import com.jinkyumpark.library.library.Library;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder

@Entity
@Table(
uniqueConstraints = {
                @UniqueConstraint(name = "library_book_isbn_library_unique", columnNames = {"isbn", "library_id"})
        }
)
public class LibraryBook {

    @EmbeddedId
    private LibraryBookId id;

    @MapsId("libraryId")
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "library_id")
    private Library library;

}
