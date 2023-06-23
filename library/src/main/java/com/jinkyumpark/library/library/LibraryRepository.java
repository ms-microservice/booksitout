package com.jinkyumpark.library.library;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LibraryRepository extends JpaRepository<Library, Long> {

    @Query("select l from Library l where l.name like concat('%', ?1, '%')")
    Page<Library> findAllByName(String name, Pageable pageable);

    @Query("select l from Library l where l.name like concat('%', ?1, '%') or l.address like concat('%', ?1, '%')")
    Page<Library> findAllByQuery(String query, Pageable pageable);

    @Query("select l from Library l where l.regionDetail.region.regionId = :regionId")
    Page<Library> findAllByRegionId(Long regionId, Pageable pageable);

    @Query("select l from Library l where l.regionDetail.regionDetailId = :regionDetailId")
    Page<Library> findAllByRegionDetailId(Long regionDetailId, Pageable pageable);

    @Query("select l from Library l where (l.latitude between :latitudeStart and :latitudeEnd) and (l.longitude between :longitudeStart and :longitudeEnd)")
    Page<Library> findAllByLatitudeAndLongitudeRange(double latitudeStart, double latitudeEnd, double longitudeStart, double longitudeEnd, Pageable pageable);

    @Query("select l from Library l where l.name = ?1")
    Optional<Library> findByName(String name);

    @Query("select l from Library l where l.name like concat('%', :query, '%') or l.address like concat('%', :query, '%')")
    List<Library> findAllByNameOrAddress(String query, Pageable pageable);

    @Query("select l from Library l where l.regionDetail.regionDetailId = :regionDetailId and l.regionDetail.region.regionId = :regionId")
    Page<Library> findAllByRegionIdAndRegionDetailId(Long regionId, Long regionDetailId, Pageable pageable);

}
