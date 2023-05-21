package com.jinkyumpark.user.utils.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import javax.transaction.Transactional;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Service
public class S3Service {

    private final S3Client s3;

    @Value("${cloud.aws.s3.bucket}") private String bucketName;
    @Value("${cloud.aws.region.static}") private String regionName;

    @Transactional
    public String uploadFile(String fileName, String directory, byte[] file) {
        String key = directory + "/" + fileName;

        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .key(key)
                .bucket(bucketName)
                .build();

        s3.putObject(objectRequest, RequestBody.fromBytes(file));

        String encodedFileName = URLEncoder.encode(key, StandardCharsets.UTF_8);
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, regionName, encodedFileName);
    }

}
