package com.nextalx.service;

import com.nextalx.dto.request.CreateAssetRequest;
import com.nextalx.dto.response.AssetResponse;

import java.util.List;

public interface AssetService {

    List<AssetResponse> getAllAssets();

    AssetResponse createAsset(
            CreateAssetRequest request
    );
}