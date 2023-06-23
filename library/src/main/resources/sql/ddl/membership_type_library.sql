CREATE TABLE membership_type_library
(
    membership_type_id BIGINT NOT NULL,
    library_id         BIGINT NOT NULL,
    CONSTRAINT pk_membershiptypelibrary PRIMARY KEY (membership_type_id, library_id)
);

ALTER TABLE membership_type_library
    ADD CONSTRAINT FK_MEMBERSHIPTYPELIBRARY_ON_LIBRARY FOREIGN KEY (library_id) REFERENCES library (library_id);

ALTER TABLE membership_type_library
    ADD CONSTRAINT FK_MEMBERSHIPTYPELIBRARY_ON_MEMBERSHIP_TYPE FOREIGN KEY (membership_type_id) REFERENCES membership_type (id);