CREATE TABLE region_detail(

    region_detail_id BIGINT       NOT NULL auto_increment,
    CONSTRAINT pk_region_detail PRIMARY KEY (region_detail_id),

    korean_name      VARCHAR(20)  NOT NULL,
    english_name     VARCHAR(20)  NULL,

    logo             VARCHAR(255) NULL,

    data4lib_code    MEDIUMINT      NULL,

    region_id        BIGINT       NOT NULL
);

ALTER TABLE region_detail
    ADD CONSTRAINT FK_REGION_DETAIL_REGION_ID FOREIGN KEY (region_id) REFERENCES region (region_id);