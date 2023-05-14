CREATE TABLE reading_session
(
    reading_session_id BIGINT                 NOT NULL  primary key,

    app_user_id        BIGINT                 NULL,
    book_id            BIGINT                 NULL,

    start_page         INT                    NULL,
    end_page           INT                    NULL,

    start_time         datetime DEFAULT NOW() NOT NULL,
    end_time           datetime               NULL,

    read_time          INT                    NULL
);

ALTER TABLE reading_session ADD CONSTRAINT READING_SESSION_BOOK_FK FOREIGN KEY (book_id) REFERENCES book (book_id);