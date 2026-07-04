package com.nextalx.controller;

import com.nextalx.dto.request.CreateAssetCategoryRequest;
import com.nextalx.dto.response.AssetCategoryResponse;
import com.nextalx.service.AssetCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/asset-categories")
@RequiredArgsConstructor
public class AssetCategoryController {

    private final AssetCategoryService assetCategoryService;

    @GetMapping
    public List<AssetCategoryResponse> getAllAssetCategories() {
        return assetCategoryService.getAllAssetCategories();
    }

    @PostMapping
    public AssetCategoryResponse createAssetCategory(
            @Valid @RequestBody
            CreateAssetCategoryRequest request
    ) {
        return assetCategoryService
                .createAssetCategory(request);
    }
}