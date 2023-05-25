CREATE TABLE library_book(
    library_book_id BIGINT NOT NULL,
    CONSTRAINT pk_library_book PRIMARY KEY (library_book_id),

    isbn            BIGINT unsigned NULL,
    library_id      BIGINT NOT NULL
);

ALTER TABLE library_book ADD CONSTRAINT library_book_isbn_library_unique UNIQUE (isbn, library_id);

ALTER TABLE library_book ADD CONSTRAINT FK_LIBRARY_BOOK_LIBRARY_ID FOREIGN KEY (library_id) REFERENCES library (library_id);