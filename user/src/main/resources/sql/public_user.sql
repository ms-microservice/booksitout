CREATE TABLE public_user
(
    public_user_id       BIGINT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nick_name            VARCHAR(20)    NOT NULL UNIQUE,
    profile_image        VARCHAR(1000)  NULL,

    app_user_id          BIGINT         NULL
);

ALTER TABLE public_user ADD CONSTRAINT FK_PUBLICUSER_ON_APPUSER FOREIGN KEY (app_user_id) REFERENCES app_user (app_user_id);