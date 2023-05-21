CREATE TABLE post_like
(
    post_like_id BIGINT NOT NULL,
    score        BIT(1) NULL,
    post_id      BIGINT NOT NULL,
    app_user_id  BIGINT NULL,
    CONSTRAINT pk_postlike PRIMARY KEY (post_like_id)
);

ALTER TABLE post_like
    ADD CONSTRAINT post_like_unique UNIQUE (post_id, app_user_id);

ALTER TABLE post_like
    ADD CONSTRAINT FK_POSTLIKE_ON_POST FOREIGN KEY (post_id) REFERENCES post (post_id);