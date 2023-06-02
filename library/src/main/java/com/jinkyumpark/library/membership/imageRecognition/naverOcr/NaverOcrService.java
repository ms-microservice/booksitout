package com.jinkyumpark.library.membership.imageRecognition.naverOcr;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@RequiredArgsConstructor
@Service
public class NaverOcrService {

    private final WebClient webClient;

    @Value("${api.uri.naver-ocr}")
    private String naverOcrUri;
    @Value("${api.secret.naver-ocr}")
    private String naverOcrSecret;

    public List<String> getImageRecognitionResultByLineBreak(String imageUri) {
        NaverOcrResponse response = webClient
                .post()
                .uri(naverOcrUri)
                .header(
                        "X-OCR-SECRET", naverOcrSecret,
                        "Content-Type", "application/json"
                )
                .bodyValue(NaverOcrRequest.of(imageUri))
                .retrieve()
                .bodyToMono(NaverOcrResponse.class)
                .block();

        if (response == null) return List.of();

        return response.getAllText();
    }

}
