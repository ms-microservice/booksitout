package com.jinkyumpark.library.membership.type;

import com.jinkyumpark.library.common.PageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController @RequestMapping("v5/library/membership/type")
public class MembershipTypeControllerV5 {

    private final MembershipTypeService membershipTypeService;
    private final PageService pageService;

    @GetMapping
    public List<MembershipTypeResponse> getMembershipTypeByQuery(@RequestParam("q") String query,
                                                                 @RequestParam(value = "size", required = false) Integer size) {
        Pageable pageable = pageService.getPageable(1, size);

        Page<MembershipType> pagedMembership = membershipTypeService.getMembershipTypeByQuery(query, pageable);
        return pagedMembership.getContent().stream()
                .map(MembershipTypeResponse::of)
                .collect(Collectors.toList());
    }

}
