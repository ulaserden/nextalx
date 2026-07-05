package com.nextalx.repository;

import com.nextalx.entity.Asset;
import com.nextalx.enums.AssetStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository
        extends JpaRepository<Asset, Long> {

    boolean existsByAssetTag(
            String assetTag
    );

    boolean existsByAssetTagAndIdNot(
            String assetTag,
            Long id
    );

    boolean existsBySerialNumber(
            String serialNumber
    );

    boolean existsBySerialNumberAndIdNot(
            String serialNumber,
            Long id
    );

    long countByStatus(
            AssetStatus status
    );

    @Override
    @EntityGraph(
            attributePaths = {
                    "category"
            }
    )
    Page<Asset> findAll(
            Pageable pageable
    );
}