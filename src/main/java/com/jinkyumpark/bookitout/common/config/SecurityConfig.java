package com.jinkyumpark.bookitout.common.config;

import com.jinkyumpark.bookitout.common.security.filters.JwtTokenFilter;
import com.jinkyumpark.bookitout.common.security.filters.JwtLoginFilter;
import com.jinkyumpark.bookitout.user.AppUserService;
import com.jinkyumpark.bookitout.common.util.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

import javax.crypto.SecretKey;

@RequiredArgsConstructor

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtConfig jwtConfig;
    private final CorsConfig corsConfig;

    private final SecretKey secretKey;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    private final AppUserService appUserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                .cors()
                .configurationSource(corsConfig.corsConfigurationSource())
                .and()

                .addFilter(new JwtLoginFilter(authenticationManager(), jwtConfig, jwtUtils))
                .addFilterAfter(new JwtTokenFilter(secretKey, jwtConfig), JwtLoginFilter.class)

                .authorizeRequests()
                .antMatchers("/", "index", "/css/*", "/js/*").permitAll()
                .antMatchers("/**/join/**", "/**/login/**", "/**/qna/**").permitAll()
                .antMatchers("/**/search/**").permitAll()

                .anyRequest()
                .authenticated()
                .and();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(daoAuthenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder);
        provider.setUserDetailsService(appUserService);
        return provider;
    }
}
