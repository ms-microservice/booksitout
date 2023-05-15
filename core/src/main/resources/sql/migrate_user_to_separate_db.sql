# app user
create table auth.app_user like book.app_user;
insert into auth.app_user select * from book.app_user;