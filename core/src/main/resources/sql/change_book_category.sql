alter table book rename column category to category_tmp;
alter table book add column category varchar(20);

update book set category='OTHERS' where category_tmp=1;
update book set category='PHILOSOPHY' where category_tmp=2;
update book set category='RELIGION' where category_tmp=3;
update book set category='SOCIAL_SCIENCE' where category_tmp=4;
update book set category='NATURAL_SCIENCE' where category_tmp=5;
update book set category='TECHNOLOGY' where category_tmp=6;
update book set category='ART' where category_tmp=7;
update book set category='LANGUAGE' where category_tmp=8;
update book set category='LITERATURE' where category_tmp=9;
update book set category='HISTORY' where category_tmp=10;
update book set category='UNKNOWN' where category_tmp=11;