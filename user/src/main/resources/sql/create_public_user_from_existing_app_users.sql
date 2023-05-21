insert into public_user (nick_name, profile_image, app_user_id)
select name, profile_image, app_user_id
from app_user
where 1=1;