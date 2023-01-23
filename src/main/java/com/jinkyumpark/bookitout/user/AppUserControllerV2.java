package com.jinkyumpark.bookitout.user;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.jinkyumpark.bookitout.user.dto.OAuthDto;
import com.jinkyumpark.bookitout.user.oauth.OAuthProvider;
import com.jinkyumpark.bookitout.user.oauth.google.GoogleToken;
import com.jinkyumpark.bookitout.user.oauth.google.GoogleUserInfo;
import com.jinkyumpark.bookitout.user.oauth.kakao.KakaoUserInfo;
import com.jinkyumpark.bookitout.user.oauth.kakao.KakaoToken;
import com.jinkyumpark.bookitout.user.oauth.naver.NaverUserInfo;
import com.jinkyumpark.bookitout.user.oauth.naver.NaverToken;
import com.jinkyumpark.bookitout.user.response.LoginSuccessResponse;
import com.jinkyumpark.bookitout.common.util.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController @RequestMapping("v2/login/oauth2")
public class AppUserControllerV2 {
    private final AppUserService appUserService;
    private final OAuthService oAuthService;
    private final JwtUtils jwtUtils;
    private final Environment environment;
    private final Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES).create();

    @GetMapping("kakao")
    public LoginSuccessResponse getKakaoJwtToken(@RequestParam("code") String code) {
        String tokenUrl = environment.getProperty("oauth.kakao.token-url") + "?grant_type=authorization_code&client_id=e0b8e02a9826e15029e2182d1d03bf2b&code=" + code;
        String userInfoUrl = environment.getProperty("oauth.kakao.user-info-url");

        String tokenJsonResponse = oAuthService.getOauthAccessToken(tokenUrl);
        KakaoToken kakaoToken = gson.fromJson(tokenJsonResponse, KakaoToken.class);

        String userInfoJsonResponse = oAuthService.getOauthUserInfo(userInfoUrl, "Bearer " + kakaoToken.getAccessToken());
        KakaoUserInfo kakaoUserInfo = gson.fromJson(userInfoJsonResponse, KakaoUserInfo.class);

        OAuthDto kakaoDto = OAuthDto.builder()
                .oAuthId(kakaoUserInfo.getId())
                .oAuthProvider(OAuthProvider.KAKAO)
                .email(kakaoUserInfo.getKakaoAccount().getEmail())
                .name(kakaoUserInfo.getProperties().getNickname())
                .profileImage(kakaoUserInfo.getKakaoAccount().getProfile().getProfileImageUrl())
                .build();

        AppUser addedAppUser = appUserService.addOrUpdateOAuthUser(kakaoDto);

        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        String jwtToken = jwtUtils.generateAccessToken(kakaoDto.getName(), addedAppUser.getAppUserId(), authorities, true);

        return LoginSuccessResponse.builder()
                .message(String.format("어서오세요 %s님!", kakaoDto.getName()))
                .token("\"Bearer\" " + jwtToken)
                .name(kakaoDto.getName())
                .registerDate(addedAppUser.getCreatedDate())
                .profileImage(kakaoDto.getProfileImage())
                .build();
    }

    @GetMapping("naver")
    public LoginSuccessResponse getNaverJwtToken(@RequestParam("code") String code,
                                                 @RequestParam("state") String state) {
        String clientId = environment.getProperty("oauth.naver.client-id");
        String clientSecret = environment.getProperty("oauth.naver.client-secret");
        String accessTokenUrl = String.format(
                environment.getProperty("oauth.naver.token-url") + "?" +
                        "grant_type=authorization_code&" +
                        "client_id=%s&" +
                        "client_secret=%s&" +
                        "code=%s&" +
                        "state=%s",
                clientId,
                clientSecret,
                code,
                state
        );
        String accessTokenJson = oAuthService.getOauthAccessToken(accessTokenUrl);
        NaverToken naverToken = gson.fromJson(accessTokenJson, NaverToken.class);

        String userInfoUrl = environment.getProperty("oauth.naver.user-info-url");
        String userInfoJson = oAuthService.getOauthUserInfo(userInfoUrl, "Bearer " + naverToken.getAccessToken());
        NaverUserInfo naverUserInfo = gson.fromJson(userInfoJson, NaverUserInfo.class);

        OAuthDto naverDto = OAuthDto.builder()
                .oAuthId(naverUserInfo.getResponse().getId())
                .oAuthProvider(OAuthProvider.NAVER)
                .email(naverUserInfo.getResponse().getEmail())
                .name(naverUserInfo.getResponse().getName())
                .profileImage(naverUserInfo.getResponse().getProfileImage())
                .build();
        AppUser addedAppUser = appUserService.addOrUpdateOAuthUser(naverDto);

        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        String jwtToken = jwtUtils.generateAccessToken(naverDto.getName(), addedAppUser.getAppUserId(), authorities, true);
        return LoginSuccessResponse.builder()
                .message(String.format("어서오세요 %s님", naverDto.getName()))
                .token("\"Bearer\" " + jwtToken)
                .name(naverDto.getName())
                .registerDate(addedAppUser.getCreatedDate())
                .profileImage(naverDto.getProfileImage())
                .build();
    }

    @GetMapping("google")
    public LoginSuccessResponse getGoogleJwtToken(@RequestParam("code") String code,
                                                  @RequestParam("scope") String scope) {
        Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES).create();

        String tokenUrl = String.format(
                "%s?" +
                        "grant_type=authorization_code&" +
                        "client_id=%s&" +
                        "client_secret=%s&" +
                        "redirect_uri=%s&" +
                        "code=%s"
                ,
                environment.getProperty("oauth.google.token-url"),
                environment.getProperty("oauth.google.client-id"),
                environment.getProperty("oauth.google.client-secret"),
                "https://book.jinkyumpark.com/login/oauth/google",
                code
        );
        String userInfoUrl = environment.getProperty("oauth.google.user-info-url");

        String tokenJsonResponse = oAuthService.getOauthAccessToken(tokenUrl);
        GoogleToken googleToken = gson.fromJson(tokenJsonResponse, GoogleToken.class);

        String userInfoJsonResponse = oAuthService.getOauthUserInfo(userInfoUrl, googleToken.getTokenType() + " " + googleToken.getAccessToken());
        GoogleUserInfo googleUserInfo = gson.fromJson(userInfoJsonResponse, GoogleUserInfo.class);

        OAuthDto googleDto = OAuthDto.builder()
//                .oAuthId()
//                .oAuthProvider(OAuthProvider.GOOGLE)
//                .email()
//                .name()
//                .profileImage()
                .build();

        AppUser addedAppUser = appUserService.addOrUpdateOAuthUser(googleDto);

        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        String jwtToken = jwtUtils.generateAccessToken(googleDto.getName(), addedAppUser.getAppUserId(), authorities, true);

        return LoginSuccessResponse.builder()
                .message(String.format("어서오세요 %s님!", googleDto.getName()))
                .token("\"Bearer\" " + jwtToken)
                .name(googleDto.getName())
                .registerDate(addedAppUser.getCreatedDate())
                .profileImage(googleDto.getProfileImage())
                .build();
    }
}
