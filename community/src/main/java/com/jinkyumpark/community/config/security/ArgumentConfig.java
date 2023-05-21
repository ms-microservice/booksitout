package com.jinkyumpark.community.config.security;

import com.jinkyumpark.community.config.security.adminOnly.AdminOnlyArgumentResolver;
import com.jinkyumpark.community.config.security.loginUser.LoginUserArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class ArgumentConfig implements WebMvcConfigurer {

    private final AdminOnlyArgumentResolver adminOnlyArgumentResolver;
    private final LoginUserArgumentResolver loginUserArgumentResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.addAll(List.of(adminOnlyArgumentResolver, loginUserArgumentResolver));
    }

}