create table post
(
    post_id            bigint auto_increment primary key,

    title              varchar(50) null,
    content            varchar(1000) null,
    isbn               bigint(13) null,

    created_date       datetime(6) null,
    last_modified_date datetime(6) null,

    app_user_id        bigint not null
);

create table post_like
(
    post_like_id bigint auto_increment primary key,

    score        bit null default 1,

    post_id      bigint not null,
    app_user_id  bigint not null,

    constraint post_like_unique unique (post_id, app_user_id),
    constraint post_like_post_id_fk foreign key (post_id) references post (post_id)
);