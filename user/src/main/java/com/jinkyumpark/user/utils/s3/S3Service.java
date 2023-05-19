package com.jinkyumpark.user.utils.s3;

import com.amazonaws.services.s3.AmazonS3;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Service
public class S3Service {

    private final AmazonS3 s3;

    @Value("${cloud.aws.s3.bucket}") private String bucketName;
    private String regionName = "ap-northeast-2";

    public String uploadFile(String fileName, File file) {
        s3.putObject(bucketName + "/profile-image", fileName, file);

        String encodedKey = URLEncoder.encode(fileName, StandardCharsets.UTF_8);
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, regionName, encodedKey);
    }

}
