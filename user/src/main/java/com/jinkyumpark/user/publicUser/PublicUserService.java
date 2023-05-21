package com.jinkyumpark.user.publicUser;

import com.jinkyumpark.common.exception.NoContentException;
import com.jinkyumpark.user.appUser.AppUser;
import com.jinkyumpark.user.appUser.AppUserRepository;
import com.jinkyumpark.user.publicUser.dto.PublicUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class PublicUserService {

    private final AppUserRepository appUserRepository;

    public PublicUser getPublicUserByAppUserId(Long appUserId) {
        AppUser appUser = appUserRepository.findById(appUserId)
                .orElseThrow(() -> new NoContentException(""));

        return PublicUser.of(appUser);
    }

    public PublicUser getPublicUserByPublicName(String publicName) {
        AppUser appUser = appUserRepository.findByPublicName(publicName)
                .orElseThrow(() -> new NoContentException("public user you're looking for is not present"));

        return PublicUser.of(appUser);
    }

    @Transactional
    public PublicUser updatePublicUser(PublicUser editedPublicUser) {
        AppUser appUser = appUserRepository.findById(editedPublicUser.getAppUserId())
                .orElseThrow(() -> new NoContentException("수정할 프로필이 없어요"));

        AppUser updatedAppUser = appUser.updatePublicProfile(editedPublicUser.getName(), editedPublicUser.getProfileImage());

        return PublicUser.of(updatedAppUser);
    }

}
