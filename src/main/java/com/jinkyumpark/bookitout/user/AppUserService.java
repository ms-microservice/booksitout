package com.jinkyumpark.bookitout.user;

import com.jinkyumpark.bookitout.common.exception.http.NotFoundException;
import com.jinkyumpark.bookitout.common.exception.http.NotLoginException;
import com.jinkyumpark.bookitout.common.security.token.AppUserAuthenticationToken;
import com.jinkyumpark.bookitout.common.util.jwt.JwtUtils;
import com.jinkyumpark.bookitout.user.dto.AppUserDto;
import com.jinkyumpark.bookitout.user.dto.OAuthDto;
import com.jinkyumpark.bookitout.user.response.LoginMethod;
import com.jinkyumpark.bookitout.user.response.LoginSuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AppUserService implements UserDetailsService {
    private final AppUserRepository appUserRepository;
    private final JwtUtils jwtUtils;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return appUserRepository
                .findByEmail(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("No App User found")
                );
    }

    public Optional<AppUser> getUserByEmail(String email) {
        return appUserRepository.findByEmail(email);
    }

    public AppUser getAppUserById(Long appUserId) {
        return appUserRepository.findById(appUserId)
                .orElseThrow(() -> new NotFoundException(""));
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

    @Transactional
    public void addEmailVerificationCode(String email, Integer code) {
        AppUser appUser = AppUser.builder()
                .email(email)
                .emailVerificationCode(code)
                .build();

        appUserRepository.save(appUser);
    }

    @Transactional
    public void updateUserId(Long appUserId, AppUserDto appUserDto) {
        AppUser existingAppUser = appUserRepository.findById(appUserId)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        existingAppUser.updateUser(appUserDto);
    }

    @Transactional
    public void updateUserByEmail(String email, AppUserDto appUserDto) {
        AppUser existingAppUser = appUserRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("User Not Found"));

        existingAppUser.updateUser(appUserDto);
    }

    @Transactional
    public AppUser addOrUpdateOAuthUser(OAuthDto OAuthDto) {
        Optional<AppUser> userOptional = appUserRepository.findByEmail(OAuthDto.getEmail());

        if (userOptional.isPresent()) {
            AppUser appUser = userOptional.get();
            appUser.saveOrUpdateOAuthUser(OAuthDto);
            return appUser;
        }

        AppUser appUser = AppUser.builder()
                .oAuthId(OAuthDto.getOAuthId())
                .email(OAuthDto.getEmail())
                .name(OAuthDto.getName())
                .profileImage(OAuthDto.getProfileImage())
                .oAuthProvider(OAuthDto.getOAuthProvider())
                .build();

        return appUserRepository.save(appUser);
    }

    public LoginSuccessResponse getLoginSuccessResponse(OAuthDto oAuthDto, AppUser addedAppUser, LoginMethod loginMethod) {
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        String jwtToken = jwtUtils.generateAccessToken(oAuthDto.getName(), addedAppUser.getAppUserId(), authorities, true);

        return LoginSuccessResponse.builder()
                .message(String.format("어서오세요 %s님!", oAuthDto.getName()))
                .token("\"Bearer\" " + jwtToken)
                .name(oAuthDto.getName())
                .registerDate(addedAppUser.getCreatedDate())
                .profileImage(oAuthDto.getProfileImage())
                .loginMethod(loginMethod)
                .build();
    }
}
