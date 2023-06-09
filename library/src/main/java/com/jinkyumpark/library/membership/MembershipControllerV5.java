package com.jinkyumpark.library.membership;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.PagedResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.library.common.PageService;
import com.jinkyumpark.library.common.loginUser.LoginUser;
import com.jinkyumpark.library.common.loginUser.User;
import com.jinkyumpark.library.common.s3.S3Service;
import com.jinkyumpark.library.membership.appleWallet.AppleWalletService;
import com.jinkyumpark.library.membership.dto.MembershipResponse;
import com.jinkyumpark.library.membership.dto.MembershipAddRequest;
import com.jinkyumpark.library.membership.dto.MembershipEditRequest;
import com.jinkyumpark.library.membership.imageRecognition.ImageRecognitionService;
import com.jinkyumpark.library.membership.imageRecognition.LibraryMembershipImageRecognitionResponse;
import com.jinkyumpark.library.membership.imageRecognition.naverOcr.NaverOcrService;
import com.jinkyumpark.library.membership.type.MembershipType;
import de.brendamour.jpasskit.PKPass;
import de.brendamour.jpasskit.signing.PKSigningException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.security.cert.CertificateException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController @RequestMapping("v5/library/membership")
public class MembershipControllerV5 {

    private final MembershipService membershipService;

    private final AppleWalletService appleWalletService;
    private final NaverOcrService naverOcrService;
    private final ImageRecognitionService imageRecognitionService;

    private final S3Service s3Service;
    private final PageService pageService;

    @GetMapping("{membershipId}")
    public MembershipResponse getMembershipId(@PathVariable("membershipId") Long membershipId) {
        Membership membership = membershipService.getLibraryMembershipById(membershipId);

        return MembershipResponse.of(membership);
    }

    @GetMapping
    public PagedResponse<List<MembershipResponse>> getAllRegisteredMembership(@LoginUser User user,
                                                                              @RequestParam(value = "page", required = false) Integer page,
                                                                              @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = pageService.getPageableSortedDesc(page, size, "lastUsedDate");
        Page<Membership> pagedMembership = membershipService.getAllMembership(user.getId(), pageable);

        List<MembershipResponse> content = pagedMembership.getContent().stream()
                .map(MembershipResponse::of)
                .collect(Collectors.toList());

        return PagedResponse.<List<MembershipResponse>>builder()
                .first(pagedMembership.isFirst())
                .last(pagedMembership.isLast())
                .totalElements((int) pagedMembership.getTotalElements())
                .totalPages(pagedMembership.getTotalPages())
                .content(content)
                .build();
    }

    @GetMapping(value = "apple-wallet/{membershipId}", produces = "application/vnd.apple.pkpass")
    public ResponseEntity<byte[]> getAppleWalletPass(@PathVariable Long membershipId) throws PKSigningException, CertificateException, IOException {
        PKPass pkPass = appleWalletService.getAppleWalletJson(membershipId);
        byte[] appleWalletPass = appleWalletService.getAppleWalletPass(pkPass);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf("application/vnd.apple.pkpass"));
        headers.set("Content-Disposition", "attachment; filename=appleWalletPass.pkpass");

        return new ResponseEntity<>(appleWalletPass, headers, HttpStatus.OK);
    }

    @SneakyThrows
    @PostMapping("image")
    public LibraryMembershipImageRecognitionResponse getImageRecognitionResult(@RequestParam(value = "file", required = false) MultipartFile multipartFile) {
        List<String> recognizedTextList = new ArrayList<>();

        if (multipartFile != null) {
            byte[] imageData = multipartFile.getInputStream().readAllBytes();
            String s3Url = s3Service.uploadFile(UUID.randomUUID().toString(), "", imageData);
            recognizedTextList.addAll(naverOcrService.getImageRecognitionResultByLineBreak(s3Url));
        }

        String membershipNumber = imageRecognitionService.getMembershipNumber(String.join("", recognizedTextList));
        MembershipType membershipType = imageRecognitionService.getMembershipType(recognizedTextList);

        return LibraryMembershipImageRecognitionResponse.of(membershipNumber, membershipType);
    }

    @PostMapping
    public AddSuccessResponse addMembership(@LoginUser User user,
                                            @RequestBody @Valid MembershipAddRequest membershipAddRequest) {
        Membership toAdd = membershipAddRequest.toEntity(user.getId());
        Membership added = membershipService.add(toAdd);

        return AddSuccessResponse.builder()
                .id(added.getLibraryMembershipId())
                .added(MembershipResponse.of(added))
                .message("회원증을 추가했어요")
                .build();
    }

    @PutMapping("{membershipId}")
    public UpdateSuccessResponse updateMembership(@LoginUser User user,
                                                  @PathVariable("membershipId") Long membershipId,
                                                  @RequestBody @Valid MembershipEditRequest membershipEditRequest) {
        Membership toEdit = membershipService.update(membershipEditRequest.toEntity(user.getId(), membershipId));
        Membership edited = membershipService.update(toEdit);

        return UpdateSuccessResponse.builder()
                .id(edited.getLibraryMembershipId())
                .updated(edited)
                .message("회원증을 수정했어요")
                .build();
    }

    @DeleteMapping("{membershipId}")
    public DeleteSuccessResponse deleteMembership(@LoginUser User user,
                                                  @PathVariable("membershipId") Long membershipId) {
        membershipService.delete(user.getId(), membershipId);

        return DeleteSuccessResponse.builder()
                .id(membershipId)
                .message("회원증을 지웠어요")
                .build();
    }

}
