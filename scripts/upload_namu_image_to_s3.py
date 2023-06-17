import requests
import boto3
import pymysql

# ENV
sql_get_region_image = """
    SELECT region_detail.region_detail_id, region_detail.logo, region.english_name as region_name, region_detail.english_name as region_detail_name
    FROM region
    JOIN region_detail ON region.region_id = region_detail.region_id
"""
sql_update_region_image = 'UPDATE region_detail SET logo = %s WHERE region_detail_id = %s'
mysql_host, mysql_user, mysql_pw, mysql_db = '', '', '', ''

s3_access_key = ''
s3_secret = ''
s3_region = 'ap-northeast-2'
s3_bucket = 'booksitout-bucket'

# AWS RDS Connection
mysql_connection = pymysql.connect(
    host=mysql_host,
    user=mysql_user,
    password=mysql_pw,
    database=mysql_db
)
cursor = mysql_connection.cursor()

# Get region logo url from RDS
cursor.execute(sql_get_region_image)
urls = cursor.fetchall()

# AWS S3 connection
s3 = boto3.client('s3',
                  aws_access_key_id=s3_access_key,
                  aws_secret_access_key=s3_secret,
                  region_name=s3_region)

# Processing each URL
for region_detail_id, image, region_name, region_detail_name in urls:
    print("start processing " + str(region_detail_id))

    # # Download image from URL
    # response = requests.get(image)
    # if response.status_code != 200:
    #     break
    #
    # image_name = 'region/' + english_name
    #
    # # Upload image to S3
    # s3.upload_fileobj(response.raw, s3_bucket, image_name)  # Replace 'bucket-name' with your S3 bucket name
    # s3_image_url = f"https://{s3.meta.endpoint_url}/{s3_bucket}/{image_name}"
    #
    # # Replace existing URL data with S3 image URL
    # cursor.execute(sql_update_region_image, (s3_image_url, region_detail_id))

    image_url = f"{s3.meta.endpoint_url}/{s3_bucket}/{region_name}-{region_detail_name}"
    cursor.execute(sql_update_region_image, (image_url, region_detail_id))

# Commit the changes and close the connection
mysql_connection.commit()
cursor.close()
mysql_connection.close()
