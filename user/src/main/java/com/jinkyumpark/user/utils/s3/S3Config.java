package com.jinkyumpark.user.utils.s3;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class S3Config {

    @Value("${cloud.aws.s3.access-key}") private String accessKey;
    @Value("${cloud.aws.s3.secret-key}") private String secretKey;

    @Primary
    @Bean
    public AmazonS3 amazonS3Client() {
        BasicAWSCredentials s3Credential = new BasicAWSCredentials(accessKey, secretKey);

        return AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.AP_NORTHEAST_2)
                .withCredentials(new AWSStaticCredentialsProvider(s3Credential))
                .build();
    }

}
