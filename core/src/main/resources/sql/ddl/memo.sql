CREATE TABLE memo
(
    memo_id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,

    page    INT                   NULL,
    content VARCHAR(1000)         NOT NULL,

    book_id BIGINT                NOT NULL
);

ALTER TABLE memo ADD CONSTRAINT MEMO_BOOK_FK FOREIGN KEY (book_id) REFERENCES book (book_id);