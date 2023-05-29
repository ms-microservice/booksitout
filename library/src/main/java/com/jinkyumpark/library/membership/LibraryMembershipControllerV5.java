package com.jinkyumpark.library.membership;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.PagedResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.library.common.PageService;
import com.jinkyumpark.library.common.feign.client.UserClient;
import com.jinkyumpark.library.common.feign.response.AppUserResponse;
import com.jinkyumpark.library.common.loginUser.LoginUser;
import com.jinkyumpark.library.common.loginUser.User;
import com.jinkyumpark.library.membership.dto.LibraryMembershipResponse;
import com.jinkyumpark.library.membership.dto.MembershipAddRequest;
import com.jinkyumpark.library.membership.dto.MembershipEditRequest;
import com.jinkyumpark.library.region.RegionDetail;
import com.jinkyumpark.library.region.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController @RequestMapping("v5/library/membership")
public class LibraryMembershipControllerV5 {

    private final LibraryMembershipService libraryMembershipService;
    private final RegionService regionService;
    private final UserClient userClient;

    private final PageService pageService;

    @GetMapping("{membershipId}")
    public LibraryMembershipResponse getMembershipId(@PathVariable("membershipId") Long membershipId) {
        LibraryMembership membership = libraryMembershipService.getLibraryMembershipById(membershipId);
        AppUserResponse appUser = userClient.getAppUserById(membership.getAppUserId());

        if (membership.getRegion() == null) {
            return LibraryMembershipResponse.of(membership);
        }

        Optional<RegionDetail> regionDetail = regionService.getRegionDetailById(membership.getRegion().getRegionDetailId());

        if (regionDetail.isEmpty()) {
            return LibraryMembershipResponse.of(membership);
        }

        return LibraryMembershipResponse.of(membership, regionDetail.get());
    }

    @GetMapping
    public PagedResponse getAllRegisteredMembership(@LoginUser User user,
                                                    @RequestParam(value = "page", required = false) Integer page,
                                                    @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = pageService.getPageable(page, size);
        Page<LibraryMembership> pagedMembership = libraryMembershipService.getAllMembership(user.getId(), pageable);

        List<LibraryMembershipResponse> content = pagedMembership.getContent().stream()
                .map(membership ->
                        membership.getRegion() == null ?
                                LibraryMembershipResponse.of(membership)
                                :
                                LibraryMembershipResponse.of(
                                        membership,
                                        membership.getRegion()
                                ))
                .collect(Collectors.toList());

        return PagedResponse.builder()
                .first(pagedMembership.isFirst())
                .last(pagedMembership.isLast())
                .totalElements((int) pagedMembership.getTotalElements())
                .totalPages(pagedMembership.getTotalPages())
                .content(content)
                .build();
    }

    @PostMapping
    public AddSuccessResponse addMembership(@LoginUser User user,
                                            @RequestBody @Valid MembershipAddRequest membershipAddRequest) {
        LibraryMembership toAdd = membershipAddRequest.toEntity(user.getId());
        LibraryMembership added = libraryMembershipService.add(toAdd);

        return AddSuccessResponse.builder()
                .id(added.getLibraryMembershipId())
                .added(added)
                .message("회원증을 추가했어요")
                .build();
    }

    @PatchMapping("{membershipId}")
    public UpdateSuccessResponse updateMembership(@LoginUser User user,
                                                  @PathVariable("membershipId") Long membershipId,
                                                  @RequestBody @Valid MembershipEditRequest membershipEditRequest) {
        LibraryMembership toEdit = libraryMembershipService.update(membershipEditRequest.toEntity(user.getId(), membershipId));
        LibraryMembership edited = libraryMembershipService.update(toEdit);

        return UpdateSuccessResponse.builder()
                .id(edited.getLibraryMembershipId())
                .updated(edited)
                .message("회원증을 수정했어요")
                .build();
    }

    @DeleteMapping("{membershipId}")
    public DeleteSuccessResponse deleteMembership(@LoginUser User user,
                                                  @PathVariable("membershipId") Long membershipId) {
        libraryMembershipService.delete(user.getId(), membershipId);

        return DeleteSuccessResponse.builder()
                .id(membershipId)
                .message("회원증을 지웠어요")
                .build();
    }
}
