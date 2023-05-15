CREATE TABLE app_user
(
    app_user_id             BIGINT                          NOT NULL    PRIMARY KEY,

    created_date            datetime                        NULL,
    last_modified_date      datetime                        NULL,

    email                   VARCHAR(255)                    NOT NULL,
    password                VARCHAR(255)                    NULL,
    name                    VARCHAR(20)                     NULL,

    profile_image           VARCHAR(255)                    NULL,

    o_auth_provider         VARCHAR(10) DEFAULT 'NOT_USING' NULL,
    o_auth_id               VARCHAR(100)                    NULL,

    email_verification_code INT                             NULL,

    roles                   VARCHAR(255)                    NULL
);

ALTER TABLE app_user ADD CONSTRAINT app_user_email_unique UNIQUE (email);