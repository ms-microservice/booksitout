CREATE TABLE comment_like
(
    comment_like_id    BIGINT   NOT NULL,
    created_date       datetime NULL,
    last_modified_date datetime NULL,
    score              INT      NOT NULL,
    comment_id         BIGINT   NOT NULL,
    app_user_id        BIGINT   NOT NULL,
    CONSTRAINT fk_commentlike PRIMARY KEY (comment_like_id)
);

ALTER TABLE comment_like
    ADD CONSTRAINT comment_like_unique UNIQUE (comment_id, app_user_id);

ALTER TABLE comment_like
    ADD CONSTRAINT FK_COMMENTLIKE_ON_COMMENT FOREIGN KEY (comment_id) REFERENCES comment (comment_id);