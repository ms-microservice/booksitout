package com.jinkyumpark.library.library;

import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.library.location.LocationService;
import com.jinkyumpark.library.region.RegionService;
import com.jinkyumpark.library.region.region.Region;
import com.jinkyumpark.library.region.regionDetail.RegionDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class LibraryService {

    private final LibraryRepository libraryRepository;
    private final LocationService locationService;
    private final RegionService regionService;

    public Library getLibraryId(Long libraryId) {
        return libraryRepository.findById(libraryId)
                .orElseThrow(() -> new NotFoundException("Library not found"));
    }

    public Page<Library> getLibraryByName(String name, Pageable pageable) {
        return libraryRepository.findAllByName(name, pageable);
    }

    public Page<Library> getLibraryByQuery(String query, Pageable pageable) {
        return libraryRepository.findAllByQuery(query, pageable);
    }

    public Page<Library> getLibraryByRegionId(Long regionId, Pageable pageable) {
        return libraryRepository.findAllByRegionId(regionId, pageable);
    }

    public Page<Library> getLibraryByRegionDetailId(Long regionDetailId, Pageable pageable) {
        return libraryRepository.findAllByRegionDetailId(regionDetailId, pageable);
    }

    public Page<Library> getLibraryByLatitudeAndLongitudeRange(double latitude, double longitude, int radiusInMeter,
                                                               Pageable pageable) {
        double[] latitudeRange = locationService.getLatitudeRange(latitude, radiusInMeter);
        double[] longitudeRange = locationService.getLongitudeRange(latitude, longitude, radiusInMeter);

        return libraryRepository.findAllByLatitudeAndLongitudeRange(latitudeRange[0], latitudeRange[1], longitudeRange[0], longitudeRange[1], pageable);
    }

    public Optional<Library> getLibraryByName(String name) {
        return libraryRepository.findByName(name);
    }

    public Page<Library> getLibraryByEnglishName(String englishName, Pageable pageable) {
        Long regionDetailId = regionService.getRegionDetailByEnglishName(englishName).getRegionDetailId();

        return getLibraryByRegionDetailId(regionDetailId, pageable);
    }

    public List<Library> getLibraryByQueryLike(String query, Pageable pageable) {
        return libraryRepository.findAllByNameOrAddress(query, pageable);
    }

    public Page<Library> getLibraryByRegionAndRegionDetail(String region, String regionDetail, Pageable pageable) {
        Region regionResult = regionService.getRegionByEnglishName(region);
        RegionDetail regionDetailResult = regionService.getRegionDetailByEnglishName(regionDetail);

        if (regionResult == null || regionDetailResult == null) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "해당 지역이 없어요");
        }

        Long regionId = regionResult.getRegionId();
        Long regionDetailId = regionDetailResult.getRegionDetailId();

        return libraryRepository.findAllByRegionIdAndRegionDetailId(regionId, regionDetailId, pageable);
    }

    public Page<Library> getLibraryByRegion(String region, Pageable pageable) {
        Region regionResult = regionService.getRegionByEnglishName(region);
        if (regionResult == null) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "해당 지역이 없어요");
        }

        Long regionId = regionResult.getRegionId();

        return libraryRepository.findAllByRegionId(regionId, pageable);
    }
}
