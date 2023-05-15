package com.jinkyumpark.user.idpw;

import com.jinkyumpark.user.appUser.AppUser;
import com.jinkyumpark.user.appUser.AppUserService;
import com.jinkyumpark.user.response.LoginMethod;
import com.jinkyumpark.user.response.LoginSuccessResponse;
import com.jinkyumpark.user.email.EmailSender;
import com.jinkyumpark.user.email.Mail;
import com.jinkyumpark.common.exception.*;
import com.jinkyumpark.user.jwt.JwtUtils;
import com.jinkyumpark.user.oauth.OAuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("user/v3")
public class AppUserControllerV3 {

    private final AppUserService appUserService;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final EmailSender emailSender;

    @PostMapping("login")
    public LoginSuccessResponse login(@RequestBody EmailPasswordLoginRequest loginRequest) {
        AppUser appUser = appUserService.getUserByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new UnauthorizedException("가입되지 않은 이메일이에요"));
        if (appUser.getPassword() == null || !passwordEncoder.matches(loginRequest.getPassword(), appUser.getPassword())) {
            throw new UnauthorizedException("비밀번호가 틀렸어요");
        }

        String token = "Bearer " + jwtUtils.generateAccessToken(appUser.getName(), appUser.getAppUserId(), appUser.getAuthorities(), true);

        return LoginSuccessResponse.builder()
                .message(String.format("어서오세요! %s님!", appUser.getName()))
                .token(token)

                .name(appUser.getName())
                .registerDate(appUser.getCreatedDate())
                .profileImage(appUser.getProfileImage())
                .appUserId(appUser.getAppUserId())

                .loginMethod(LoginMethod.MANUAL)

                .build();
    }

    @PostMapping("join/verification")
    public ResponseEntity<String> join(@RequestBody JoinEmailVerificationRequest verificationRequest) {
        Optional<AppUser> userByEmail = appUserService.getUserByEmail(verificationRequest.getEmail());
        if (userByEmail.isPresent() && !userByEmail.get().getOAuthProvider().equals(OAuthProvider.NOT_USING)) {
            throw new BadRequestException(String.format("%s 계정으로 가입된 이메일이에요", userByEmail.get().getOAuthProvider().getDisplayKoreanName()));
        }

        if (userByEmail.isPresent() && userByEmail.get().getEmailVerificationCode() == null) {
            throw new ConflictException("이미 가입된 이메일이에요");
        }

        if (userByEmail.isPresent() && userByEmail.get().getEmailVerificationCode() != null) {
            throw new AlreadyReportedException("이미 이메일에 인증번호를 보냈어요");
        }

        Integer verificationCode = appUserService.getVerificationCode(5);
        String EMAIL_SUBJECT = "책잇아웃에 가입하기 위해 인증번호를 입력해 주세요";
        String EMAIL_CONTENT = String.valueOf(verificationCode);
        Mail mail = Mail.builder()
                .toAddress(verificationRequest.getEmail())
                .subject(EMAIL_SUBJECT)
                .content(EMAIL_CONTENT)
                .build();

        emailSender.sendEmail(mail);

        appUserService.addEmailVerificationCode(verificationRequest.getEmail(), verificationCode);

        return new ResponseEntity<String>(Map.of("message", "인증번호를 메일로 보냈어요. 확인해 주세요").toString(), HttpStatus.OK);
    }

}
