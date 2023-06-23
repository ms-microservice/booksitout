CREATE TABLE book_custom
(
    custom_book_id BIGINT       NOT NULL,
    title          VARCHAR(100) NULL,
    author         VARCHAR(100) NULL,
    cover          VARCHAR(255) NULL,
    category       VARCHAR(25) NULL,
    book_id   BIGINT       NULL,
    CONSTRAINT pk_book_custom PRIMARY KEY (custom_book_id)
);

ALTER TABLE book_custom
    ADD CONSTRAINT FK_BOOK_CUSTOM_ON_BOOK_BOOK FOREIGN KEY (book_id) REFERENCES book (book_id);