package com.jinkyumpark.bookitout.user;

import lombok.Getter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class AppUserAuthenticationToken extends UsernamePasswordAuthenticationToken {
    private final Long id;

    public AppUserAuthenticationToken(Object principal, Long id) {
        super(principal, null);
        this.id = id;
    }

    public AppUserAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities, Long id) {
        super(principal, credentials, authorities);
        this.id = id;
    }
}
