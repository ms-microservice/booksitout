CREATE TABLE gathering(
    gathering_id       BIGINT        NOT NULL,

    title              VARCHAR(255)  NULL,
    content            VARCHAR(2000) NULL,
    type               VARCHAR(10)   NULL,

    created_date       datetime      NULL,
    last_modified_date datetime      NULL,

    location_type      VARCHAR(10)   NULL,
    location           VARCHAR(100)  NULL,

    capacity           tinyint unsigned NULL,
    app_user_id        BIGINT        NULL,

    CONSTRAINT pk_gathering PRIMARY KEY (gathering_id)
);

CREATE TABLE gathering_join(
    gathering_join_id  BIGINT        NOT NULL,

    created_date       datetime      NULL,
    last_modified_date datetime      NULL,

    app_user_id        BIGINT        NULL,
    gathering_id       BIGINT        NULL,

    content            VARCHAR(1000) NOT NULL,
    status             VARCHAR(10)   NOT NULL,

    CONSTRAINT pk_gathering_join PRIMARY KEY (gathering_join_id)
);