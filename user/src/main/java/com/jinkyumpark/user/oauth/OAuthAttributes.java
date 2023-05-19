package com.jinkyumpark.user.oauth;

import com.jinkyumpark.user.appUser.AppUser;
import com.jinkyumpark.user.authorization.AppUserRole;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Builder
@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;
    private String picture;

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .picture((String) attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public AppUser toEntity() {
        return AppUser.builder()
                .name(name)
                .email(email)
                .profileImage(picture)
                .roles(AppUserRole.USER.toString())
                .build();
    }

}
