package com.jinkyumpark.library.library.batch.steps;

import com.jinkyumpark.library.data4library.Data4LibService;
import com.jinkyumpark.library.data4library.response.ApiData4LibraryAvailableLibraryResponse;
import com.jinkyumpark.library.library.Library;
import com.jinkyumpark.library.region.RegionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Configuration;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class AvailableLibraryProcessor implements ItemProcessor<ApiData4LibraryAvailableLibraryResponse, Library> {

    private final Data4LibService data4LibService;
    private final RegionService regionService;

    @Override
    public Library process(ApiData4LibraryAvailableLibraryResponse availableLibrary) {
        log.info(availableLibrary.getResponse().getLibs().toString());

        List<Library> availableLibraryList = availableLibrary
                .getResponse()
                .getLibs().stream()
                .map(libs ->
                        data4LibService.availableLibraryToEntity(
                                libs.getLib(),
                                regionService.getMostMatchRegionDetailByAddress(libs.getLib().getAddress()).getRegionDetailId()
                        )
                )
                .collect(Collectors.toList());

        if (availableLibraryList.isEmpty()) {
            log.error("available library list empty. page : {}", availableLibrary.getResponse().getPageNo());
            return null;
        }

        return availableLibraryList.get(0);
    }

}
