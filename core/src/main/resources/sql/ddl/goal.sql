CREATE TABLE goal
(
    app_user_id BIGINT NOT NULL,

    goal        INT    NOT NULL,
    year        INT    NOT NULL,

    CONSTRAINT pk_goal PRIMARY KEY (app_user_id, year)
);