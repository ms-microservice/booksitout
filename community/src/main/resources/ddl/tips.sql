create table tips
(
    tips_id             bigint auto_increment primary key,

    content             varchar(2000) null,
    estimated_read_time int null,
    title               varchar(30) not null,
    type                varchar(10) not null,
    summary             varchar(255) null,

    created_date        date null,
    last_modified_date  date null
);