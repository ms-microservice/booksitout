package com.jinkyumpark.library.library.batch.availableLibrary.steps;

import com.jinkyumpark.library.data4library.Data4LibService;
import com.jinkyumpark.library.data4library.response.ApiData4LibraryAvailableLibraryResponse;
import com.jinkyumpark.library.library.Library;
import com.jinkyumpark.library.region.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Configuration;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Configuration
public class AvailableLibraryProcessor implements ItemProcessor<ApiData4LibraryAvailableLibraryResponse, Library> {

    private final Data4LibService data4LibService;
    private final RegionService regionService;

    @Override
    public Library process(ApiData4LibraryAvailableLibraryResponse availableLibrary) {
        return availableLibrary
                .getResponse()
                .getLibs().stream()
                .map(libs ->
                        data4LibService.availableLibraryToEntity(
                                libs.getLib(),
                                regionService.getMostMatchRegionDetailByAddress(libs.getLib().getAddress()).getRegionDetailId()
                        )

                )
                .collect(Collectors.toList())
                .get(0);
    }

}
