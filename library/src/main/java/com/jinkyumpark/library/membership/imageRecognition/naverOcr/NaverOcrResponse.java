package com.jinkyumpark.library.membership.imageRecognition.naverOcr;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class NaverOcrResponse {

    private String version;
    private String requestId;
    private Long timestamp;
    private List<NaverOcrResponseImage> images;
    private String originalFileName;

    public List<String> getAllText() {
        if (images.size() == 0) return List.of();

        NaverOcrResponseImage image = images.get(0);

        return image.getFields().stream()
                .map(NaverOcrResponseImageField::getInferText)
                .collect(Collectors.toList());
    }

}

@Getter
@NoArgsConstructor @AllArgsConstructor
class NaverOcrResponseImage {
    private String uid;
    private String name;
    private String inferResult;
    private String message;
    private NaverOcrResponseValidationResult validationResult;
    private NaverOcrResponseImageInfo convertedImageInfo;

    private List<NaverOcrResponseImageField> fields;
}

@Getter
@NoArgsConstructor @AllArgsConstructor
class NaverOcrResponseValidationResult {
    private String result;
}

@Getter
@NoArgsConstructor @AllArgsConstructor
class NaverOcrResponseImageInfo {
    private Integer width;
    private Integer height;
    private Integer pageIndex;
    private Boolean longImage;
}

@Getter
@NoArgsConstructor @AllArgsConstructor
class NaverOcrResponseImageField {
    private String valueType;
    private NaverOcrResponseBoundingPolicy boundingPoly;
    private String inferText;
    private Double inferConfidence;
    private String type;
    private boolean lineBreak;
}

@Getter
@NoArgsConstructor @AllArgsConstructor
class NaverOcrResponseBoundingPolicy {
    private List<NaverOcrResponseVertices> vertices;
}

@Getter
@NoArgsConstructor @AllArgsConstructor
class NaverOcrResponseVertices {
    private Double x;
    private Double y;
}