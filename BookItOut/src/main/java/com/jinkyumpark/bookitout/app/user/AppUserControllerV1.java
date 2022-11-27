package com.jinkyumpark.bookitout.app.user;

import com.jinkyumpark.bookitout.exception.common.ConflictException;
import com.jinkyumpark.bookitout.exception.common.UnknownException;
import com.jinkyumpark.bookitout.user.request.EmailPasswordLoginRequest;
import com.jinkyumpark.bookitout.user.request.JoinRequest;
import com.jinkyumpark.bookitout.user.response.JoinSuccessResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/v1")
public class AppUserControllerV1 {

    private AppUserService appUserService;
    private PasswordEncoder passwordEncoder;

    @PostMapping("join")
    public JoinSuccessResponse join(@RequestBody @Valid JoinRequest joinRequest) {
        Optional<AppUser> userOptional = appUserService.getUserByEmail(joinRequest.getEmail());

        if (userOptional.isPresent()) {
            throw new ConflictException("이미 있는 email 이에요");
        }

        String encodedPassword = passwordEncoder.encode(joinRequest.getPassword());
        AppUser appUser = new AppUser(joinRequest.getEmail(), encodedPassword, joinRequest.getName());

        AppUser result = appUserService.addUser(appUser);
        if (result.getEmail().equals(joinRequest.getEmail())) {
            return new JoinSuccessResponse(String.format("책-it-out에 오신걸 환경해요, %s님!", joinRequest.getName()), "api/v1/join");
        }

        throw new UnknownException();
    }

    @PostMapping("login")
    public void login(@RequestBody @Valid EmailPasswordLoginRequest loginRequest) {}
}