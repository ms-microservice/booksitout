package com.jinkyumpark.user;

import com.jinkyumpark.user.oauth.google.GoogleToken;
import com.jinkyumpark.user.oauth.google.GoogleUserInfo;
import com.jinkyumpark.user.oauth.kakao.KakaoUserInfo;
import com.jinkyumpark.user.oauth.kakao.KakaoToken;
import com.jinkyumpark.user.oauth.naver.NaverUserInfo;
import com.jinkyumpark.user.oauth.naver.NaverToken;
import com.jinkyumpark.user.response.LoginMethod;
import com.jinkyumpark.user.response.LoginSuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@RestController @RequestMapping("v2/login/oauth2")
public class AppUserControllerV2 {
    private final AppUserService appUserService;
    private final Environment environment;
    private final RestTemplate restTemplate;

    @GetMapping("kakao")
    public LoginSuccessResponse getKakaoJwtToken(@RequestParam("code") String code) {
        String tokenUrl = String.format("%s?grant_type=authorization_code&client_id=%s&code=%s",
                environment.getProperty("oauth.kakao.token-url"),
                environment.getProperty("oauth.kakao.client-id"),
                code);
        KakaoToken kakaoToken = restTemplate.getForObject(tokenUrl, KakaoToken.class);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(kakaoToken.getAccessToken());
        KakaoUserInfo kakaoUserInfo = restTemplate.postForObject(environment.getProperty("oauth.kakao.user-info-url"), new HttpEntity<>(headers), KakaoUserInfo.class);

        AppUser addedAppUser = appUserService.addOrUpdateOAuthUser(kakaoUserInfo.toDto());
        return appUserService.getLoginSuccessResponse(kakaoUserInfo.toDto(), addedAppUser, LoginMethod.OAUTH_KAKAO);
    }

    @GetMapping("naver")
    public LoginSuccessResponse getNaverJwtToken(@RequestParam("code") String code,
                                                 @RequestParam("state") String state) {
        String accessTokenUrl = String.format("%s?grant_type=authorization_code&client_id=%s&client_secret=%s&code=%s&state=%s",
                environment.getProperty("oauth.naver.token-url"),
                environment.getProperty("oauth.naver.client-id"),
                environment.getProperty("oauth.naver.client-secret"),
                code,
                state);
        NaverToken naverToken = restTemplate.getForObject(accessTokenUrl, NaverToken.class);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(naverToken.getAccessToken());
        NaverUserInfo naverUserInfo = restTemplate.postForObject(environment.getProperty("oauth.naver.user-info-url"), new HttpEntity<>(headers), NaverUserInfo.class);

        AppUser addedAppUser = appUserService.addOrUpdateOAuthUser(naverUserInfo.toDto());
        return appUserService.getLoginSuccessResponse(naverUserInfo.toDto(), addedAppUser, LoginMethod.OAUTH_NAVER);
    }

    @GetMapping("google")
    public LoginSuccessResponse getGoogleJwtToken(@RequestParam("code") String code,
                                                  @RequestParam("scope") String scope) {
        String tokenUrl = String.format("%s?grant_type=authorization_code&client_id=%s&client_secret=%s&redirect_uri=%s&code=%s",
                environment.getProperty("oauth.google.token-url"),
                environment.getProperty("oauth.google.client-id"),
                environment.getProperty("oauth.google.client-secret"),
                "https://book.jinkyumpark.com/login/oauth/google",
                code);
        GoogleToken googleToken = restTemplate.postForObject(tokenUrl, null, GoogleToken.class);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(googleToken.getAccessToken());
        GoogleUserInfo googleUserInfo = restTemplate.postForObject(environment.getProperty("oauth.google.user-info-url"), new HttpEntity<>(headers), GoogleUserInfo.class);

        AppUser addedAppUser = appUserService.addOrUpdateOAuthUser(googleUserInfo.toDto());
        return appUserService.getLoginSuccessResponse(googleUserInfo.toDto(), addedAppUser, LoginMethod.OAUTH_GOOGLE);
    }

    @GetMapping("facebook")
    public LoginSuccessResponse getFacebookJwtToken(@RequestParam("code") String code) {
//        String tokenUrl = String.format("https://graph.facebook.com/v15.0/oauth/access_token?client_id=%s&redirect_uri=%s&client_secret=%s&code=%d");
//        String tokenJsonResponse = oAuthService.getOauthAccessToken(tokenUrl);
//        FacebookToken facebookToken = gson.fromJson(tokenJsonResponse, FacebookToken.class);\
//        String userInfoUrl = environment.getProperty("oauth.google.user-info-url");
//        String userInfoJsonResponse = oAuthService.getOauthUserInfo(userInfoUrl,  "Bearer " + facebookToken.getAccessToken());

        return null;
    }
}
