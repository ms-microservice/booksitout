create table comment
(
    comment_id         bigint auto_increment primary key,

    content            varchar(200) null,

    app_user_id        bigint not null,
    post_id            bigint not null,

    created_date       datetime(6) null,
    last_modified_date datetime(6) null,

    constraint comment_post_id_fk
        foreign key (post_id) references post (post_id)
);

