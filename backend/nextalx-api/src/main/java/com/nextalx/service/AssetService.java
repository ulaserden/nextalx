package com.nextalx.service;

import com.nextalx.dto.request.CreateAssetRequest;
import com.nextalx.dto.request.UpdateAssetRequest;
import com.nextalx.dto.response.AssetResponse;
import com.nextalx.enums.AssetStatus;
import com.nextalx.enums.WarrantyStatus;
import org.springframework.data.domain.Page;

public interface AssetService {

    Page<AssetResponse> getAllAssets(
            int page,
            int size,
            String search,
            AssetStatus status,
            Long categoryId,
            WarrantyStatus warranty
    );

    AssetResponse createAsset(
            CreateAssetRequest request
    );

    AssetResponse updateAsset(
            Long id,
            UpdateAssetRequest request
    );

    AssetResponse setAvailable(
            Long id
    );

    AssetResponse setInRepair(
            Long id
    );

    AssetResponse setRetired(
            Long id
    );

    AssetResponse setLost(
            Long id
    );

    AssetResponse setBroken(
            Long id
    );
}