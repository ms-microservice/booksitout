package com.jinkyumpark.community.gathering;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.community.config.feign.UserClient;
import com.jinkyumpark.community.config.feign.response.AppUserInfo;
import com.jinkyumpark.community.config.security.loginUser.LoginUser;
import com.jinkyumpark.community.config.security.loginUser.User;
import com.jinkyumpark.community.gathering.dto.*;
import com.jinkyumpark.community.gathering.join.GatheringJoinService;
import lombok.RequiredArgsConstructor;
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
    public List<GatheringResponse> getAllGatherings(@RequestParam(value = "type", required = false) String type,
                                                    @RequestParam(value = "page", required = false) Integer page,
                                                    @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page, size, Sort.by("lastModifiedDate"));

        GatheringType gatheringType = GatheringType.valueOf(type == null || type.isEmpty() ? "ALL" : type.toUpperCase());

        List<Gathering> gatheringList = gatheringService.getAllGatheringByType(gatheringType, pageable);

        return gatheringList.stream()
                .map(gathering -> GatheringResponse.of(
                        gathering,
                        userClient.getPublicUserByAppUserId(gathering.getAppUserId()))
                )
                .collect(Collectors.toList());
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
