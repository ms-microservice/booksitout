package com.jinkyumpark.forum.config.security.adminOnly;

import com.jinkyumpark.common.exception.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class AdminOnlyArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return false;
//                parameter.getParameterAnnotation(AdminOnly.class) != null;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        List<String> roles = Arrays.stream(webRequest.getHeader("X-Authorization-Roles").split(","))
                .filter(r -> !r.isEmpty())
                .map(r -> r.replace("ROLE_", ""))
                .collect(Collectors.toList());

        if (!roles.contains("ADMIN")) {
            throw new UnauthorizedException("ADMIN ACCESS ONLY!");
        }

        return null;
    }

}
