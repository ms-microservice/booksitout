package com.jinkyumpark.bookitout.user.oauth;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.jinkyumpark.bookitout.user.*;
import com.jinkyumpark.bookitout.user.dto.KakaoDto;
import com.jinkyumpark.bookitout.user.oauth.kakao.KakaoInfo;
import com.jinkyumpark.bookitout.user.oauth.kakao.KakaoToken;
import com.jinkyumpark.bookitout.user.response.LoginSuccessResponse;
import com.jinkyumpark.bookitout.common.util.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController @RequestMapping("v2/login/oauth2")
public class OAuth2ControllerV2 {

    private final AppUserService appUserService;
    private final JwtUtils jwtUtils;

    private String getJsonString(BufferedReader bufferedReader) throws IOException {
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            response.append(line);
        }

        return String.valueOf(response);
    }

    @GetMapping("kakao")
    public LoginSuccessResponse getKakaoJwtToken(@RequestParam("code") String code) {

        try {
            URL url = new URL("https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=e0b8e02a9826e15029e2182d1d03bf2b&code=" + code);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);
            connection.setDoOutput(true);

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String response = getJsonString(bufferedReader);
            bufferedReader.close();

            Gson gson = new GsonBuilder().setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES).create();
            KakaoToken kakaoToken = gson.fromJson(response, KakaoToken.class);

            URL userInfoUrl = new URL("https://kapi.kakao.com/v2/user/me");
            HttpURLConnection userInfoConnection = (HttpURLConnection) userInfoUrl.openConnection();
            userInfoConnection.setRequestMethod("GET");
            userInfoConnection.setConnectTimeout(5000);
            userInfoConnection.setReadTimeout(5000);
            userInfoConnection.setDoOutput(true);
            userInfoConnection.setRequestProperty("Authorization", "Bearer " + kakaoToken.getAccessToken());
            userInfoConnection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            BufferedReader userInfoBufferReader = new BufferedReader(new InputStreamReader(userInfoConnection.getInputStream()));
            String userInfoResponse = getJsonString(userInfoBufferReader);
            userInfoBufferReader.close();

            KakaoInfo kakaoInfo = gson.fromJson(userInfoResponse, KakaoInfo.class);
            Long kakaoId = kakaoInfo.getId();
            String email = kakaoInfo.getKakaoAccount().getEmail();
            String image = kakaoInfo.getKakaoAccount().getProfile().getProfileImageUrl();
            String name = kakaoInfo.getProperties().getNickname();

            KakaoDto kakaoDto = KakaoDto.builder()
                    .oAuthId(kakaoId)
                    .oAuthProvider(OAuthProvider.KAKAO)
                    .email(email)
                    .name(name)
                    .profileImage(image)
                    .build();

            AppUser addedAppUser = appUserService.addOrUpdateOAuthUser(kakaoDto);

            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
            String jwtToken = jwtUtils.generateAccessToken(kakaoDto.getName(), addedAppUser.getAppUserId(), authorities, true);

            LoginSuccessResponse loginSuccessResponse = LoginSuccessResponse.builder()
                    .message(String.format("어서오세요 %s님!", kakaoDto.getName()))
                    .token("\"Bearer\" " + jwtToken)
                    .name(kakaoDto.getName())
                    .registerDate(addedAppUser.getCreatedDate())
                    .build();

            return loginSuccessResponse;

        } catch (IOException e) {
            log.info(e.getMessage());
        }

        return null;
    }
}
