CREATE TABLE BOOK(
    book_id            BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,

    app_user_id        BIGINT                NULL,
    isbn13             BIGINT                NULL,

    created_date       datetime              NULL,
    last_modified_date datetime              NULL,

    title              VARCHAR(255)          NOT NULL,
    author             VARCHAR(255)          NOT NULL,
    cover              VARCHAR(1000)         NULL,
    published_at       datetime              NULL,

    current_page       INT                   NULL,
    end_page           INT                   NOT NULL,

    source             INT                   NULL,
    form               INT                   NULL,
    language           INT                   NULL,
    category           INT                   NULL,

    review             VARCHAR(255)          NULL,
    summary            VARCHAR(255)          NULL,
    rating             INT                   NULL,

    is_give_up         BIT(1)                NULL,
    is_sharing         BIT(1)                NULL,

    memo_type          VARCHAR(255)          NULL,
    memo_link          VARCHAR(255)          NULL
);