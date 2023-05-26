package com.jinkyumpark.library.library;

import com.jinkyumpark.common.exception.NotFoundException;
import com.jinkyumpark.library.common.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class LibraryService {

    private final LibraryRepository libraryRepository;
    private final LocationService locationService;

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

}
