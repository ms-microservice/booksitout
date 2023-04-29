package com.jinkyumpark.search.security

import org.springframework.core.MethodParameter
import org.springframework.stereotype.Component
import org.springframework.web.bind.support.WebDataBinderFactory
import org.springframework.web.context.request.NativeWebRequest
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.method.support.ModelAndViewContainer

@Component
class UserArgumentResolver: HandlerMethodArgumentResolver {

    override fun supportsParameter(parameter: MethodParameter): Boolean {
        val isLoginUserAnnotation = parameter.getParameterAnnotation(LoginUser::class.java) != null
        val isUserClass = User::class.java == parameter.parameterType;

        return isLoginUserAnnotation && isUserClass
    }

    override fun resolveArgument(
        parameter: MethodParameter,
        mavContainer: ModelAndViewContainer?,
        webRequest: NativeWebRequest,
        binderFactory: WebDataBinderFactory?
    ): Any? {

        val appUserId: Long = webRequest.getHeader("X-Authorization-Id")?.toLongOrNull() ?: 0L

        return User(
            id = appUserId,
            name = ""
        )
    }
}