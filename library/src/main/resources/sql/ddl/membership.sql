CREATE TABLE library_membership(
    library_membership_id BIGINT       NOT NULL auto_increment,
    number                VARCHAR(20) NULL,
    region_detail_id      BIGINT       NULL,
    app_user_id           BIGINT       NOT NULL,
    CONSTRAINT pk_library_membership PRIMARY KEY (library_membership_id)
);

ALTER TABLE library_membership
    ADD CONSTRAINT FK_LIBRARY_MEMBERSHIP_ON_REGION_DETAIL FOREIGN KEY (region_detail_id) REFERENCES region_detail (region_detail_id);