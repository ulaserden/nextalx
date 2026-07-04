package com.nextalx.service;

import com.nextalx.dto.request.CreateAssetCategoryRequest;
import com.nextalx.dto.response.AssetCategoryResponse;
import org.springframework.data.domain.Page;

public interface AssetCategoryService {

    Page<AssetCategoryResponse> getAllAssetCategories(
            int page,
            int size
    );

    AssetCategoryResponse createAssetCategory(
            CreateAssetCategoryRequest request
    );
}