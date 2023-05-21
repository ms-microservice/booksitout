package com.jinkyumpark.user.publicUser.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PublicUserEditRequest {

    private String name;

}
