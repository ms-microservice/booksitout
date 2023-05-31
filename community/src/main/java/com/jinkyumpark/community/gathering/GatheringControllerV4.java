package com.jinkyumpark.community.gathering;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.PagedResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.community.config.feign.UserClient;
import com.jinkyumpark.community.config.feign.response.AppUserInfo;
import com.jinkyumpark.community.config.security.loginUser.LoginUser;
import com.jinkyumpark.community.config.security.loginUser.User;
import com.jinkyumpark.community.gathering.dto.GatheringAddRequest;
import com.jinkyumpark.community.gathering.dto.GatheringDetailResponse;
import com.jinkyumpark.community.gathering.dto.GatheringResponse;
import com.jinkyumpark.community.gathering.dto.GatheringUpdateRequest;
import com.jinkyumpark.community.gathering.join.GatheringJoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("v4/forum/gathering")
public class GatheringControllerV4 {

    private final GatheringService gatheringService;
    private final GatheringJoinService gatheringJoinService;
    private final UserClient userClient;

    @GetMapping("all")
    public PagedResponse getAllGatherings(@RequestParam(value = "type", required = false) String type,
                                          @RequestParam(value = "page", required = false) Integer page,
                                          @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("lastModifiedDate").descending());

        Page<Gathering> gatheringPage;
        if (type == null || type.isEmpty() || type.equalsIgnoreCase("ALL")) {
            gatheringPage = gatheringService.getAllGathering(pageable);
        } else {
            GatheringType gatheringType = GatheringType.valueOf(type.toUpperCase());
            gatheringPage = gatheringService.getAllGatheringByType(gatheringType, pageable);
        }

        List<GatheringResponse> content = gatheringPage.getContent().stream()
                .map(gathering -> GatheringResponse.of(
                        gathering,
                        userClient.getPublicUserByAppUserId(gathering.getAppUserId()))
                )
                .collect(Collectors.toList());

        return PagedResponse.builder()
                .first(gatheringPage.isFirst())
                .last(gatheringPage.isLast())
                .totalPages(gatheringPage.getTotalPages())
                .totalElements((int) gatheringPage.getTotalElements())
                .content(content)
                .build();
    }

    @GetMapping("{gatheringId}")
    public GatheringDetailResponse getGatheringDetails(@PathVariable("gatheringId") Long gatheringId) {
        Gathering gathering = gatheringService.getGatheringById(gatheringId);
        AppUserInfo user = userClient.getUserInfoByUserId(gathering.getAppUserId());
        int joinCount = gatheringJoinService.getJoinCount(gatheringId);

        return GatheringDetailResponse.of(gathering, user, joinCount);
    }

    @PostMapping
    public AddSuccessResponse addGathering(@RequestBody @Valid GatheringAddRequest gatheringAddRequest,
                                           @LoginUser User loginUser) {
        Gathering addedGathering = gatheringService.addGathering(gatheringAddRequest.toEntity(loginUser.getId()));

        return AddSuccessResponse.builder()
                .id(addedGathering.getGatheringId())
                .added(addedGathering)
                .build();
    }

    @PutMapping("{gatheringId}")
    public UpdateSuccessResponse updateGathering(@PathVariable("gatheringId") Long gatheringId,
                                                 @RequestBody @Valid GatheringUpdateRequest gatheringUpdateRequest,
                                                 @LoginUser User loginUser) {
        Gathering gatheringToUpdate = gatheringUpdateRequest.toEntity(gatheringId);
        Gathering updatedGathering = gatheringService.updateGathering(gatheringToUpdate, loginUser.getId());

        return UpdateSuccessResponse.builder()
                .id(gatheringId)
                .updated(updatedGathering)
                .build();
    }

    @DeleteMapping("{gatheringId}")
    public DeleteSuccessResponse deleteGathering(@PathVariable("gatheringId") Long gatheringId,
                                                 @LoginUser User loginUser) {
        gatheringService.deleteGathering(gatheringId, loginUser.getId());

        return DeleteSuccessResponse.builder()
                .id(gatheringId)
                .build();
    }

}
