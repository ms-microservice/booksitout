package com.jinkyumpark.user.publicUser;

import com.jinkyumpark.common.exception.NoContentException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class PublicUserService {

    private final PublicUserRepository publicUserRepository;

    public PublicUser getPublicUserByAppUserId(Long appUserId) {
        return publicUserRepository.findByAppUserId(appUserId)
                .orElseThrow(() -> new NoContentException(""));
    }

    public PublicUser getPublicUserByNickname(String nickName) {
        return publicUserRepository.findByNickName(nickName)
                .orElseThrow(() -> new NoContentException("public user you're looking for is not present"));
    }

    @Transactional
    public PublicUser updatePublicUser(PublicUser editedPublicUser) {
        PublicUser existingPublicUser = publicUserRepository.findByAppUserId(editedPublicUser.getPublicUserId())
                .orElseThrow(() -> new NoContentException("수정할 프로필이 없어요"));

        return existingPublicUser.update(editedPublicUser.getNickName(), editedPublicUser.getProfileImage());
    }

}
