package com.jinkyumpark.library.membership.imageRecognition.naverOcr;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
public class NaverOcrRequest {

    private String lang;
    private String requestId;
    private String resultType;
    private Long timestamp;
    private String version;
    private List<NaverOcrRequestImage> images;

    public static NaverOcrRequest of(String url) {
        return NaverOcrRequest.builder()
                .lang("ko")
                .requestId("string")
                .resultType("string")
                .timestamp(LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(0)))
                .version("V1")

                .images(List.of(
                                NaverOcrRequestImage.builder()
                                        .url(url)
                                        .format("png")
                                        .name("medium")
                                        .data(null)
                                        .build()
                        )
                )

                .build();
    }

    public static NaverOcrRequest of(byte[] imageData) {
        return NaverOcrRequest.builder()
                .lang("ko")
                .requestId("string")
                .resultType("string")
                .timestamp(LocalDateTime.now().toEpochSecond(ZoneOffset.ofHours(0)))
                .version("V1")

                .images(List.of(
                                NaverOcrRequestImage.builder()
                                        .url(null)
                                        .format("png")
                                        .name(UUID.randomUUID().toString())
                                        .data(imageData)
                                        .build()
                        )
                )

                .build();
    }

}

@Getter
@NoArgsConstructor @AllArgsConstructor @Builder
class NaverOcrRequestImage {
    private String format;
    private String name;
    private byte[] data;
    private String url;
}
