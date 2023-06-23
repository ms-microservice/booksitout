package com.jinkyumpark.library.membership.imageRecognition;

import com.jinkyumpark.library.common.PageUtils;
import com.jinkyumpark.library.membership.type.MembershipType;
import com.jinkyumpark.library.membership.type.MembershipTypeService;
import com.jinkyumpark.library.region.region.Region;
import com.jinkyumpark.library.region.regionDetail.RegionDetail;
import com.jinkyumpark.library.region.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RequiredArgsConstructor
@Service
public class ImageRecognitionService {

    private final RegionService regionService;
    private final MembershipTypeService membershipTypeService;

    public String getMembershipNumber(String text) {
        String numberMoreThan10Consecutive = "\\d{11,}";
        Pattern numberPattern = Pattern.compile(numberMoreThan10Consecutive);
        Matcher matcher = numberPattern.matcher(text);

        if (matcher.find()) {
            return matcher.group();
        }

        return "";
    }

    public MembershipType getMembershipType(List<String> textList) {
        String regionCandidate = textList.stream()
                .filter(text -> text.endsWith("구") || text.endsWith("시") || text.endsWith("도서관"))
                .findFirst()
                .orElse("")
                .replace("구립", "")
                .replace("도서관", "")
                ;

        Region region = regionService.getMostMatchRegionByAddressSnippet(regionCandidate);
        RegionDetail regionDetail = regionService.getMostMatchRegionDetailByAddressSnippet(regionCandidate);

        if (regionDetail != null) {
            Optional<MembershipType> byRegionDetail = membershipTypeService.getByRegionDetail(regionDetail);
            if (byRegionDetail.isPresent()) return byRegionDetail.get();
        }

        if (region != null) {
            Optional<MembershipType> byRegion = membershipTypeService.getByRegion(region);
            if (byRegion.isPresent()) return byRegion.get();
        }

        String integratedLibraryCandidate = textList.stream()
                .filter(text -> text.contains("통합") || text.contains("책이음") || text.contains("평생"))
                .findFirst()
                .orElse("")
                ;

        List<MembershipType> result = membershipTypeService
                .getMembershipTypeByQuery(integratedLibraryCandidate, PageUtils.getPageable(1, 1)).getContent();

        if (!result.isEmpty()) {
            return result.get(0);
        }

        return null;
    }

}
