CREATE TABLE settings
(
    settings_id
    BIGINT
    NOT NULL
    PRIMARY KEY
    auto_increment,

    app_user_id
    BIGINT
    NULL,

    region
    VARCHAR(255)
    NULL,

    region_detail
    VARCHAR(255)
    NULL,

    library_search_method
    VARCHAR(10)
    NULL,

    my_book_search_range
    VARCHAR(10) DEFAULT 'REGION'
    NULL,

    library_online_search_range
    VARCHAR(255)
    NULL,

    subscription_search_range
    VARCHAR(255)
    NULL,

    used_online_search_range
    VARCHAR(255)
    NULL,

    used_offline_search_range
    VARCHAR(255)
    NULL

);

ALTER TABLE settings ADD CONSTRAINT settings_app_user_id_unique UNIQUE (app_user_id);
