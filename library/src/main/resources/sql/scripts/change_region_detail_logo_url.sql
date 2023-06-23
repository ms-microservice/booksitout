update region_detail
JOIN region ON region_detail.region_id = region.region_id
set region_detail.logo=concat('https://booksitout-bucket.s3.ap-northeast-2.amazonaws.com/region/', region.english_name, '-', region_detail.english_name, '.svg')
where region_detail.region_id != 1;