package com.jinkyumpark.bookitout.user;

import com.jinkyumpark.bookitout.exception.common.NotFoundException;
import com.jinkyumpark.bookitout.exception.common.NotLoginException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AppUserService implements UserDetailsService {
    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return appUserRepository
                .findAppUserByEmail(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("No App User found")
                );
    }

    public Optional<AppUser> getUserByEmail(String email) {
        return appUserRepository.findAppUserByEmail(email);
    }

    public AppUser getAppUserById(Long appUserId) {
        return appUserRepository.findById(appUserId)
                .orElseThrow(() -> new NotFoundException(""));
    }

    public AppUser addUser(AppUser appUser) {
        return appUserRepository.save(appUser);
    }

    public static Long getLoginAppUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!authentication.isAuthenticated()) {
            throw new NotLoginException("Please Login");
        }

        AppUserAuthenticationToken token = ((AppUserAuthenticationToken) authentication);
        return token.getAppUserId();
    }

    public Integer getVerificationCode(Integer length) {
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < length; i++) {
            code.append((int) (Math.random() * 9) + 1);
        }
        return Integer.parseInt(code.toString());
    }

    public void addEmailVerificationCode(String email, Integer code) {
        AppUser appUser = AppUser.builder()
                .email(email)
                .emailVerificationCode(code)
                .build();

        appUserRepository.save(appUser);
    }

    @Transactional
    public void updateUser(AppUser appUser) {
        AppUser existingAppUser = appUserRepository.findAppUserByEmail(appUser.getEmail())
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        if (appUser.getPassword() != null) {
            existingAppUser.setPassword(appUser.getPassword());
        }

        if (appUser.getName() != null) {
            existingAppUser.setName(appUser.getName());
        }

        if (appUser.getEmailVerificationCode() != null) {
            existingAppUser.setEmailVerificationCode(appUser.getEmailVerificationCode());
        }
    }
}
