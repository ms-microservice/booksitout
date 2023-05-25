CREATE TABLE library(
    library_id                     BIGINT       NOT NULL,
    CONSTRAINT pk_library PRIMARY KEY (library_id),

    name                           VARCHAR(100) NULL,

    address                        VARCHAR(255) NULL,
    region_detail_id BIGINT       NULL,
    latitude                       DOUBLE       NULL,
    longitude                      DOUBLE       NULL,

    phone                          INT          NULL,

    home_page                      VARCHAR(255) NULL,

    open_hour                      VARCHAR(255) NULL,
    open_day                       VARCHAR(255) NULL,

    book_count                     smallint unsigned          NULL,

    data4lib_code                  smallint unsigned          NULL
);

ALTER TABLE library ADD CONSTRAINT fk_library_region_detail_id FOREIGN KEY (region_detail_id) REFERENCES region_detail (region_detail_id);