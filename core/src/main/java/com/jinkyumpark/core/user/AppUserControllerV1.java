package com.jinkyumpark.core.user;

import com.jinkyumpark.core.common.exception.http.BadRequestException;
import com.jinkyumpark.core.common.exception.http.ConflictException;
import com.jinkyumpark.core.common.exception.http.PreConditionFailedException;
import com.jinkyumpark.core.user.dto.AppUserDto;
import com.jinkyumpark.core.user.login.LoginAppUser;
import com.jinkyumpark.core.user.login.LoginUser;
import com.jinkyumpark.core.user.request.ChangeNameRequest;
import com.jinkyumpark.core.user.request.ChangePasswordRequest;
import com.jinkyumpark.core.user.request.EmailPasswordLoginRequest;
import com.jinkyumpark.core.user.request.JoinRequest;
import com.jinkyumpark.core.user.response.JoinSuccessResponse;
import com.jinkyumpark.core.common.util.email.EmailSender;
import com.jinkyumpark.core.common.util.email.Mail;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.util.Optional;

@RequiredArgsConstructor
@RestController @RequestMapping("/v1")
public class AppUserControllerV1 {

    private final AppUserService appUserService;
    private final PasswordEncoder passwordEncoder;
    private final EmailSender emailService;
    private final Integer VERIFICATION_CODE_LENGTH = 5;

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
        AppUserDto appUserDto = AppUserDto.builder()
                .email(joinRequest.getEmail())
                .password(encodedPassword)
                .name(joinRequest.getName())
                .emailVerificationCode(null)
                .build();
        appUserService.updateUserByEmail(joinRequest.getEmail(), appUserDto);

        return new JoinSuccessResponse(String.format("책-it-out에 오신걸 환경해요, %s님!", joinRequest.getName()), "api/v1/join");
    }

    @PostMapping("login")
    public void login(@RequestBody @Valid EmailPasswordLoginRequest loginRequest) {
    }

    @PostMapping("change-password/verification")
    public ResponseEntity<String> changePasswordVerification(@LoginUser LoginAppUser loginAppUser) {
        String loginUserEmail = loginAppUser.getName();
        Integer verificationCode = appUserService.getVerificationCode(VERIFICATION_CODE_LENGTH);

        appUserService.getUserByEmail(loginUserEmail);

        AppUserDto appUserDto = AppUserDto.builder()
                .email(loginUserEmail)
                .emailVerificationCode(verificationCode)
                .build();

        appUserService.updateUserById(loginAppUser.getId(), appUserDto);

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
        AppUserDto appUserDto = AppUserDto.builder()
                .password(encodedPassword)
                .emailVerificationCode(null)
                .build();

        // TODO
//        appUserService.updateUser(appUserDto);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping("change-name")
    public ResponseEntity<String> changeName(@RequestBody @Valid ChangeNameRequest changeNameRequest, @LoginUser LoginAppUser loginAppUser) {

        AppUserDto appUserDto = AppUserDto.builder()
                .name(changeNameRequest.getName())
                .build();

        appUserService.updateUserById(loginAppUser.getId(), appUserDto);

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}