package com.nextalx.repository;

import com.nextalx.entity.Asset;
import com.nextalx.enums.AssetStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository extends JpaRepository<Asset, Long> {

    boolean existsByAssetTag(String assetTag);

    boolean existsBySerialNumber(String serialNumber);

    long countByStatus(AssetStatus status);

}