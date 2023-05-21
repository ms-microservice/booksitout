package com.jinkyumpark.user.oauth;

import com.jinkyumpark.user.appUser.AppUser;
import com.jinkyumpark.user.appUser.AppUserRepository;
import com.jinkyumpark.user.appUser.dto.AppUserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class OAuth2ServiceV4 implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final AppUserRepository appUserRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        AppUser appUser = saveOrUpdate(attributes);

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(appUser.getRoles())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey()
        );

    }

    private AppUser saveOrUpdate(OAuthAttributes attributes) {
        AppUser appUser = appUserRepository.findByEmail(attributes.getEmail())
                .map(entity -> entity.updateUser(
                                AppUserDto.builder()
                                        .name(attributes.getName())
                                        .profileImage(attributes.getPicture())
                                        .build()
                        )
                )
                .orElse(attributes.toEntity());

        return appUserRepository.save(appUser);
    }

}

/*
    https://accounts.google.com/o/oauth2/v2/auth?
        response_type=code&
        client_id=1006818294840-ukep9b2djha66u8on652mjkmmi93q94h.apps.googleusercontent.com&
        scope=openid%20profile%20email&
        state=XB7G7FpLGOuL1xIZxPo1SRmNTfMAZKB1hMD3WoBigsQ%3D&
        redirect_uri=http://localhost:8200/login/oauth2/code/google&nonce=LXzcBJXkC4hPq0hQIkgMF56XNjZv3AO2IpVm0B4Ka40
 */

