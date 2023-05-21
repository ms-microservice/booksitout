package com.jinkyumpark.user.appUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);

    @Query("select a from AppUser a where a.publicName = ?1")
    Optional<AppUser> findByPublicName(String publicName);

}
