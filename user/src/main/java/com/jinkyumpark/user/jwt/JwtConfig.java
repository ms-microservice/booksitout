package com.jinkyumpark.user.jwt;

import com.google.common.net.HttpHeaders;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter @Setter
@NoArgsConstructor

@ConfigurationProperties(prefix = "application.jwt")
@Component
public class JwtConfig {

    private String secretKey;
    private String tokenPrefix;
    private Integer tokenExpirationAfterDays;
    private Integer tokenExpirationAfterDaysStayLogin;

    public String getAuthorizationHeader() {
        return HttpHeaders.AUTHORIZATION;
    }

}