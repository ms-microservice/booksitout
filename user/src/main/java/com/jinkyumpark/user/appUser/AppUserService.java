package com.jinkyumpark.user.appUser;

import com.jinkyumpark.common.exception.NoContentException;
import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.common.exception.UnauthorizedException;
import com.jinkyumpark.user.appUser.dto.AppUserDto;
import com.jinkyumpark.user.appUser.dto.LoginMethod;
import com.jinkyumpark.user.appUser.dto.LoginSuccessResponse;
import com.jinkyumpark.user.jwt.AppUserAuthenticationToken;
import com.jinkyumpark.user.jwt.JwtUtils;
import com.jinkyumpark.user.oauth.OAuthDto;
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
import java.util.UUID;

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

    public AppUser getAppUserByAppUserId(Long appUserId) {
        return appUserRepository.findById(appUserId)
                .orElseThrow(() -> new NoContentException(""));
    }

    public static Long getLoginAppUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!authentication.isAuthenticated()) {
            throw new UnauthorizedException("Please Login");
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
    public void updateUserById(Long appUserId, AppUserDto appUserDto) {
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
                .publicName(OAuthDto.getName() + UUID.randomUUID().toString().substring(0, 5))
                .build();

        AppUser savedAppUser = appUserRepository.save(appUser);

        return savedAppUser;
    }

    public LoginSuccessResponse getLoginSuccessResponse(OAuthDto oAuthDto, AppUser addedAppUser, LoginMethod loginMethod) {
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        String jwtToken = jwtUtils.generateAccessToken(oAuthDto.getName(), addedAppUser.getAppUserId(), authorities, true);

        return LoginSuccessResponse.builder()
                .message(String.format("어서오세요 %s님!", oAuthDto.getName()))
                .token("Bearer " + jwtToken)

                .name(oAuthDto.getName())
                .publicName(addedAppUser.getPublicName())
                .registerDate(addedAppUser.getCreatedDate())
                .profileImage(oAuthDto.getProfileImage())
                .appUserId(addedAppUser.getAppUserId())

                .loginMethod(loginMethod)
                .build();
    }

}
