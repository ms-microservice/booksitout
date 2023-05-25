package com.jinkyumpark.community.gathering.join;

import com.jinkyumpark.common.response.AddSuccessResponse;
import com.jinkyumpark.common.response.DeleteSuccessResponse;
import com.jinkyumpark.common.response.PagedResponse;
import com.jinkyumpark.common.response.UpdateSuccessResponse;
import com.jinkyumpark.community.config.feign.UserClient;
import com.jinkyumpark.community.config.security.loginUser.LoginUser;
import com.jinkyumpark.community.config.security.loginUser.User;
import com.jinkyumpark.community.gathering.GatheringService;
import com.jinkyumpark.community.gathering.dto.GatheringResponse;
import com.jinkyumpark.community.gathering.join.dto.GatheringJoinAddRequest;
import com.jinkyumpark.community.gathering.join.dto.GatheringJoinResponse;
import com.jinkyumpark.community.gathering.join.dto.GatheringJoinUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("v4/forum/gathering")
public class GatheringJoinControllerV4 {

    private final GatheringJoinService gatheringJoinService;
    private final GatheringService gatheringService;
    private final UserClient userClient;

    @GetMapping("{gatheringId}/join-request/all")
    public PagedResponse getAllJoinRequestByGatheringId(@PathVariable("gatheringId") Long gatheringId,
                                                        @RequestParam(value = "page", required = false) Integer page,
                                                        @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("lastModifiedDate"));

        Page<GatheringJoin> gatheringPaged = gatheringJoinService.getAllByGatheringId(gatheringId, pageable);

        return PagedResponse.builder()
                .first(gatheringPaged.isFirst())
                .last(gatheringPaged.isLast())
                .totalElements((int) gatheringPaged.getTotalElements())
                .totalPages(gatheringPaged.getTotalPages())

                .content(gatheringPaged.getContent().stream()
                        .map(g -> GatheringJoinResponse.of(g,
                                        GatheringResponse.of(
                                                gatheringService.getGatheringById(g.getGatheringId()),
                                                userClient.getPublicUserByAppUserId(gatheringService.getGatheringById(g.getGatheringId()).getAppUserId())
                                        ),
                                        userClient.getPublicUserByAppUserId(g.getAppUserId())
                                )
                        )
                        .collect(Collectors.toList())
                )
                .build();
    }

    @GetMapping("join-request/all")
    public PagedResponse getAllJoinRequestByUserId(@RequestParam("user-id") Long appUserId,
                                                   @RequestParam(value = "page", required = false) Integer page,
                                                   @RequestParam(value = "size", required = false) Integer size) {
        if (page == null) page = 1;
        if (size == null) size = 10;
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("lastModifiedDate"));

        Page<GatheringJoin> pagedGathering = gatheringJoinService.getAllByAppUserId(appUserId, pageable);

        return PagedResponse.builder()
                .first(pagedGathering.isFirst())
                .last(pagedGathering.isLast())
                .totalElements((int) pagedGathering.getTotalElements())
                .totalPages(pagedGathering.getTotalPages())
                .content(pagedGathering.getContent().stream()
                        .map(g -> GatheringJoinResponse.of(g,
                                        GatheringResponse.of(
                                                gatheringService.getGatheringById(g.getGatheringId()),
                                                userClient.getPublicUserByAppUserId(gatheringService.getGatheringById(g.getGatheringId()).getAppUserId())
                                        ),
                                        userClient.getPublicUserByAppUserId(g.getAppUserId())
                                )
                        )
                        .collect(Collectors.toList())
                )
                .build();
    }

    @PostMapping("{gatheringId}/join-request")
    public AddSuccessResponse addJoinRequest(@LoginUser User loginUser,
                                             @PathVariable("gatheringId") Long gatheringId,
                                             @RequestBody @Valid GatheringJoinAddRequest gatheringJoinAddRequest) {
        GatheringJoin gatheringJoin = GatheringJoin.builder()
                .appUserId(loginUser.getId())
                .gatheringId(gatheringId)
                .content(gatheringJoinAddRequest.getContent())
                .status(GatheringJoinStatus.PENDING)
                .build();

        GatheringJoin addedGatheringJoin = gatheringJoinService.addGatheringJoin(gatheringJoin);

        return AddSuccessResponse.builder()
                .id(addedGatheringJoin.getGatheringJoinId())
                .added(addedGatheringJoin)
                .build();
    }

    @PutMapping("join-request/{gatheringJoinId}/status")
    public UpdateSuccessResponse acceptDeclineJoinRequest(@LoginUser User loginUser,
                                                          @PathVariable("gatheringJoinId") Long gatheringJoinId,
                                                          @RequestParam("status") GatheringJoinStatus status) {
        GatheringJoin updated = gatheringJoinService.updateStatus(gatheringJoinId, loginUser.getId(), status);

        return UpdateSuccessResponse.builder()
                .updated(updated)
                .build();
    }

    @PutMapping("join-request/{gatheringJoinId}")
    public UpdateSuccessResponse updateGatheringJoin(@LoginUser User loginUser,
                                                     @PathVariable("gatheringJoinId") Long gatheringJoinId,
                                                     @RequestBody @Valid GatheringJoinUpdateRequest gatheringJoinUpdateRequest) {
        GatheringJoin gatheringJoin = GatheringJoin.builder()
                .gatheringJoinId(gatheringJoinId)
                .appUserId(loginUser.getId())
                .content(gatheringJoinUpdateRequest.getContent())
                .build();

        GatheringJoin updatedGatheringJoin = gatheringJoinService.update(gatheringJoin);

        return UpdateSuccessResponse.builder()
                .id(gatheringJoinId)
                .updated(updatedGatheringJoin)
                .build();
    }

    @DeleteMapping("join-request/{gatheringJoinId}")
    public DeleteSuccessResponse deleteGatheringJoin(@LoginUser User loginUser,
                                                     @PathVariable("gatheringJoinId") Long gatheringJoinId) {
        GatheringJoin gatheringJoin = GatheringJoin.builder()
                .appUserId(loginUser.getId())
                .gatheringJoinId(gatheringJoinId)
                .build();

        gatheringJoinService.delete(gatheringJoin);

        return DeleteSuccessResponse.builder().build();
    }

}
