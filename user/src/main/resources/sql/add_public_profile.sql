alter table app_user add column public_name varchar(100);
alter table app_user add column public_profile_image varchar(200);
alter table app_user add constraint app_user_public_name_unique unique (public_name);