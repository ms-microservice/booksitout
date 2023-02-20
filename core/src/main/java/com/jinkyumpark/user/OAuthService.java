package com.jinkyumpark.user;

import com.jinkyumpark.common.exception.http.BadRequestException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Slf4j
@RequiredArgsConstructor
@Service
public class OAuthService {

    public String getJsonString(BufferedReader bufferedReader) throws IOException {
        StringBuilder response = new StringBuilder();
        String line;
        while ((line = bufferedReader.readLine()) != null) {
            response.append(line);
        }

        return String.valueOf(response);
    }

    public String getOauthAccessToken(String requestUrl) {
        try {
            URL url = new URL(requestUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);
            connection.setDoInput(true);

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String response = getJsonString(bufferedReader);
            bufferedReader.close();

            return response;
        } catch (Exception e) {
            log.info(e.getMessage());
        }

        throw new BadRequestException("OAuth Access Token Request Fail; Request URL: " + requestUrl);
    }

    public String getOauthUserInfo(String requestUrl, String token) {
        try {
            URL userInfoUrl = new URL(requestUrl);

            HttpURLConnection userInfoConnection = (HttpURLConnection) userInfoUrl.openConnection();
            userInfoConnection.setRequestMethod("GET");
            userInfoConnection.setConnectTimeout(5000);
            userInfoConnection.setReadTimeout(5000);
            userInfoConnection.setDoOutput(true);
            userInfoConnection.setRequestProperty("Authorization", token);

            BufferedReader userInfoBufferReader = new BufferedReader(new InputStreamReader(userInfoConnection.getInputStream()));
            String response = getJsonString(userInfoBufferReader);
            userInfoBufferReader.close();

            return response;
        } catch (Exception e) {
            log.info(e.getMessage());
        }

        throw new BadRequestException("OAuth User Info Request Fail; request url: " + requestUrl + " token: " + token);
    }
}
