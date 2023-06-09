package com.jinkyumpark.library.location.kakaoMapApi;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@RequiredArgsConstructor
@Service
public class KakaoMapApiService {

    private final WebClient webClient;

    @Value("${api.secret.kakao}")
    private String kakaoSecret;

    @SneakyThrows
    public ApiKakaoMapConvertResponse getAddressByLatitudeAndLongitude(Double latitude, Double longitude) {
        String uri = String.format(
                "https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=%s&y=%s",
                longitude,
                latitude
        );

        return webClient
                .get()
                .uri(uri)
                .header("Authorization", "KakaoAK " + kakaoSecret)
                .retrieve()
                .bodyToMono(ApiKakaoMapConvertResponse.class)
                .block();
    }

}
