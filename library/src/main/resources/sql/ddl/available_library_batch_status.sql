CREATE TABLE available_library_batch
(
    id           BIGINT AUTO_INCREMENT NOT NULL,
    start_time   datetime              NULL,
    end_time     datetime              NULL,
    current_page INT                   NULL,
    total_page   INT                   NULL,
    size         INT                   NULL,

    CONSTRAINT pk_available_library_batch PRIMARY KEY (id)
);