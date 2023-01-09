package com.jinkyumpark.bookitout.app.user;

import com.jinkyumpark.bookitout.exception.common.NotLoginException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        boolean isLoginUserAnnotation = parameter.getParameterAnnotation(LoginUser.class) != null;
        boolean isAppUserClass = LoginAppUser.class.equals(parameter.getParameterType());
        boolean isAuthenticated = SecurityContextHolder.getContext().getAuthentication().isAuthenticated();

        return isLoginUserAnnotation && isAppUserClass && isAuthenticated;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AppUserAuthenticationToken token = ((AppUserAuthenticationToken) authentication);

        return LoginAppUser.builder()
                .id(token.getAppUserId())
                .name(token.getName())
                .build();
    }

}
