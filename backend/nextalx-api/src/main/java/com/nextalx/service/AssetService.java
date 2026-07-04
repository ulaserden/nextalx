package com.nextalx.service;

import com.nextalx.dto.request.CreateAssetRequest;
import com.nextalx.dto.response.AssetResponse;
import org.springframework.data.domain.Page;

public interface AssetService {

    Page<AssetResponse> getAllAssets(
            int page,
            int size
    );

    AssetResponse createAsset(
            CreateAssetRequest request
    );
}