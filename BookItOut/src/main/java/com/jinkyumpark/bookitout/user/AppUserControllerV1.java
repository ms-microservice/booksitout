package com.jinkyumpark.bookitout.user;

import com.jinkyumpark.bookitout.user.request.ChangeNameRequest;
import com.jinkyumpark.bookitout.user.request.ChangePasswordRequest;
import com.jinkyumpark.bookitout.exception.common.*;
import com.jinkyumpark.bookitout.user.request.EmailPasswordLoginRequest;
import com.jinkyumpark.bookitout.user.request.JoinRequest;
import com.jinkyumpark.bookitout.user.response.JoinSuccessResponse;
import com.jinkyumpark.bookitout.util.email.EmailSender;
import com.jinkyumpark.bookitout.util.email.Mail;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.util.Optional;

@RestController @RequestMapping("/v1")
public class AppUserControllerV1 {

    private AppUserService appUserService;
    private PasswordEncoder passwordEncoder;
    private EmailSender emailService;

    private final Integer VERIFICATION_CODE_LENGTH;

    public AppUserControllerV1(AppUserService appUserService,
                               PasswordEncoder passwordEncoder,
                               EmailSender emailService,
                               @Value("${mail.verification-code.length}") Integer VERIFICATION_CODE_LENGTH)
    {
        this.appUserService = appUserService;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.VERIFICATION_CODE_LENGTH = VERIFICATION_CODE_LENGTH;
    }

    @PostMapping("join/email-verification/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable("email") @Email String email) {
        Optional<AppUser> appUserOptional = appUserService.getUserByEmail(email);
        if (appUserOptional.isPresent()) {
            if (appUserOptional.get().getEmailVerificationCode() != null) {
                return new ResponseEntity<>(HttpStatus.ACCEPTED);
            }

            throw new ConflictException("Email already present");
        }

        Integer verificationCode = appUserService.getVerificationCode(VERIFICATION_CODE_LENGTH);

        String EMAIL_SUBJECT = "Book it out에 가입하기 위해 인증번호를 입력해 주세요";
        String EMAIL_CONTENT = String.valueOf(verificationCode);
        Mail mail = Mail.builder()
                .toAddress(email)
                .subject(EMAIL_SUBJECT)
                .content(EMAIL_CONTENT)
                .build();
        emailService.sendEmail(mail);

        appUserService.addEmailVerificationCode(email, verificationCode);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("join")
    public JoinSuccessResponse join(@RequestBody @Valid JoinRequest joinRequest) {
        AppUser existingAppUser = appUserService.getUserByEmail(joinRequest.getEmail())
                .orElseThrow(() -> new PreConditionFailedException("이메일 인증을 해 주세요"));

        if (!existingAppUser.getEmailVerificationCode().equals(joinRequest.getCode())) {
            throw new BadRequestException("인증번호가 일치하지 않아요");
        }

        String encodedPassword = passwordEncoder.encode(joinRequest.getPassword());
        AppUser appUser = AppUser.builder()
                .email(joinRequest.getEmail())
                .password(encodedPassword)
                .name(joinRequest.getName())
                .emailVerificationCode(null)
                .build();

        appUserService.updateUser(appUser);
        return new JoinSuccessResponse(String.format("책-it-out에 오신걸 환경해요, %s님!", joinRequest.getName()), "api/v1/join");
    }

    @PostMapping("login")
    public void login(@RequestBody @Valid EmailPasswordLoginRequest loginRequest) {
    }

    @PostMapping("change-password/verification")
    public ResponseEntity<String> changePasswordVerification() {
        String loginUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Long loginUserId = AppUserService.getLoginAppUserId();

        Integer verificationCode = appUserService.getVerificationCode(VERIFICATION_CODE_LENGTH);

        AppUser appUser = AppUser.builder()
                .appUserId(loginUserId)
                .email(loginUserEmail)
                .emailVerificationCode(verificationCode)
                .build();
        appUserService.updateUser(appUser);

        String EMAIL_SUBJECT = "비밀번호를 변경하기 위해 인증번호를 입력해 주세요";
        String EMAIL_CONTENT = String.valueOf(verificationCode);
        Mail mail = Mail.builder()
                .toAddress(loginUserEmail)
                .subject(EMAIL_SUBJECT)
                .content(EMAIL_CONTENT)
                .build();
        emailService.sendEmail(mail);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("change-password")
    public ResponseEntity<String> changePassword(@RequestBody @Valid ChangePasswordRequest changePasswordRequest) {
        Long loginUserId = AppUserService.getLoginAppUserId();
        AppUser loginAppUser = appUserService.getAppUserById(loginUserId);

        if (! loginAppUser.getEmailVerificationCode().equals(changePasswordRequest.getCode())) {
            return new ResponseEntity<>("인증번호가 일치하지 않아요. 다시 확인해 주세요", HttpStatus.BAD_REQUEST);
        }

        String encodedPassword = passwordEncoder.encode(changePasswordRequest.getNewPassword());
        loginAppUser.setPassword(encodedPassword);
        loginAppUser.setEmailVerificationCode(null);

        appUserService.updateUser(loginAppUser);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping("change-name")
    public ResponseEntity<String> changeName(@RequestBody @Valid ChangeNameRequest changeNameRequest) {
        Long loginAppUserId = AppUserService.getLoginAppUserId();
        String loginAppUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        AppUser editedAppUser = AppUser.builder()
                .appUserId(loginAppUserId)
                .email(loginAppUserEmail)
                .name(changeNameRequest.getName())
                .build();

        appUserService.updateUser(editedAppUser);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}