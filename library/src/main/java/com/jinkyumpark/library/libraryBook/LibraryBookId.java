package com.jinkyumpark.library.libraryBook;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@NoArgsConstructor @AllArgsConstructor
@EqualsAndHashCode

@Embeddable
public class LibraryBookId implements Serializable {

    @Column(name = "isbn", length = 13, nullable = false)
    private String isbn;

    @Column(name = "library_id")
    private Long libraryId;

}
