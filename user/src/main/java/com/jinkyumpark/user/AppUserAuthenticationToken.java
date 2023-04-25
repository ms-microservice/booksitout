package com.jinkyumpark.user;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class AppUserAuthenticationToken extends UsernamePasswordAuthenticationToken {
    private Long appUserId;

    public AppUserAuthenticationToken(String email, String password) {
        super(email, password);
    }

    public AppUserAuthenticationToken(Object principal, Long id) {
        super(principal, null);
        this.appUserId = id;
    }

    public AppUserAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities, Long id) {
        super(principal, credentials, authorities);
        this.appUserId = id;
    }

    public Long getAppUserId() {
        return appUserId;
    }
}
