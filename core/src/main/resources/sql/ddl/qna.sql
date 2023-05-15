CREATE TABLE qna
(
    qna_id      BIGINT AUTO_INCREMENT NOT NULL  primary key,

    question    VARCHAR(255)          NOT NULL,
    answer      VARCHAR(255)          NULL,

    password    VARCHAR(255)          NULL,
    app_user_id BIGINT                NULL
);