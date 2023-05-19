package com.jinkyumpark.forum.config.security.loginUser;

import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
@Component
public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean isLoginUserAnnotation = true;
        boolean isAppUserClass = User.class.equals(parameter.getParameterType());

        return isLoginUserAnnotation && isAppUserClass;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        String header = webRequest.getHeader("X-Authorization-Id");
        if (header == null) return null;

        Long appUserId = Long.valueOf(header);

        return User.builder()
                .id(appUserId)
                .name("고양이")
                .build();
    }

}
