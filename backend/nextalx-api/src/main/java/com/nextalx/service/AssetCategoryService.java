package com.nextalx.service;

import com.nextalx.dto.request.CreateAssetCategoryRequest;
import com.nextalx.dto.response.AssetCategoryResponse;

import java.util.List;

public interface AssetCategoryService {

    List<AssetCategoryResponse> getAllAssetCategories();

    AssetCategoryResponse createAssetCategory(
            CreateAssetCategoryRequest request
    );
}