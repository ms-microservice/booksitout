alter table region add column display_korean_name varchar(20);

update region set region.display_korean_name = '서울' where region_id=1;
update region set region.display_korean_name = '부산' where region_id=2;
update region set region.display_korean_name = '광주' where region_id=3;
update region set region.display_korean_name = '대전' where region_id=4;
update region set region.display_korean_name = '대구' where region_id=5;
update region set region.display_korean_name = '인천' where region_id=6;
update region set region.display_korean_name = '울산' where region_id=7;
update region set region.display_korean_name = '세종시' where region_id=8;
update region set region.display_korean_name = '경기도' where region_id=9;
update region set region.display_korean_name = '강원도' where region_id=10;
update region set region.display_korean_name = '충청북도' where region_id=11;
update region set region.display_korean_name = '충청남도' where region_id=12;
update region set region.display_korean_name = '전라북도' where region_id=13;
update region set region.display_korean_name = '전라남도' where region_id=14;
update region set region.display_korean_name = '경상북도' where region_id=15;
update region set region.display_korean_name = '경상남도' where region_id=16;
update region set region.display_korean_name = '"제주도"' where region_id=17;