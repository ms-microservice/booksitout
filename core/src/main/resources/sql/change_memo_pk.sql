alter table memo drop primary key;
alter table memo modify column memo_id bigint not null primary key auto_increment;
alter table memo auto_increment=51;