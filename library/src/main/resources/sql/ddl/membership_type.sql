CREATE TABLE membership_type
(
    id               BIGINT AUTO_INCREMENT NOT NULL,
    name             VARCHAR(20)           NULL,
    logo             VARCHAR(50)           NULL,
    `description`    VARCHAR(500)          NULL,
    type             VARCHAR(12)           NOT NULL,
    region_id        BIGINT                NULL,
    region_detail_id BIGINT                NULL,
    CONSTRAINT pk_membershiptype PRIMARY KEY (id)
);

ALTER TABLE membership_type
    ADD CONSTRAINT FK_MEMBERSHIPTYPE_ON_REGION FOREIGN KEY (region_id) REFERENCES region (region_id);

ALTER TABLE membership_type
    ADD CONSTRAINT FK_MEMBERSHIPTYPE_ON_REGION_DETAIL FOREIGN KEY (region_detail_id) REFERENCES region_detail (region_detail_id);