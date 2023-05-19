package com.jinkyumpark.user.publicUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PublicUserRepository extends JpaRepository<PublicUser, Long> {

    @Query("select p from PublicUser p where p.appUser.appUserId = ?1")
    Optional<PublicUser> findByAppUserId(Long appUserId);

    @Query("select p from PublicUser p where p.nickName = ?1")
    Optional<PublicUser> findByNickName(String nickName);

}
