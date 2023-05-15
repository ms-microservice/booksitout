create table book_isbn
(
    book_isbn_id bigint auto_increment primary key,

    title        varchar(100) null,
    author       varchar(255) null,
    cover        varchar(500) null,

    isbn13       int(15)          null
);