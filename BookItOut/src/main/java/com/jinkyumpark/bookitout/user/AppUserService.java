package com.jinkyumpark.bookitout.user;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@AllArgsConstructor
@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return appUserRepository
                .findAppUserByEmail(username)
                .orElseThrow(() ->
                    new UsernameNotFoundException("해당 id의 유저를 찾을 수 없어요")
                );
    }

    public Optional<AppUser> getUserByEmail(String email) {
        return appUserRepository.findAppUserByEmail(email);
    }

    public AppUser addUser(AppUser appUser) {
        return appUserRepository.save(appUser);
    }
}
