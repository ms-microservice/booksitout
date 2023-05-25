CREATE TABLE region(
    region_id     BIGINT       NOT NULL auto_increment,
    CONSTRAINT pk_region PRIMARY KEY (region_id),

    korean_name   VARCHAR(20) NULL,
    english_name  VARCHAR(20) NULL,

    logo          VARCHAR(255) NULL,
    data4lib_code tinyint      NULL,
    country       VARCHAR(10)  NULL

);