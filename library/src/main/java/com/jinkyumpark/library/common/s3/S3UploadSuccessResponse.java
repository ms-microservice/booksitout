package com.jinkyumpark.library.common.s3;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class S3UploadSuccessResponse {

    private String url;

}