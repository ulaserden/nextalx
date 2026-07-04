package com.nextalx.controller;

import com.nextalx.dto.request.CreateAssetCategoryRequest;
import com.nextalx.dto.response.AssetCategoryResponse;
import com.nextalx.service.AssetCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/asset-categories")
@RequiredArgsConstructor
public class AssetCategoryController {

    private final AssetCategoryService assetCategoryService;

    @GetMapping
    public Page<AssetCategoryResponse> getAllAssetCategories(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size

    ) {

        return assetCategoryService.getAllAssetCategories(
                page,
                size
        );
    }

    @PostMapping
    public AssetCategoryResponse createAssetCategory(
            @Valid
            @RequestBody
            CreateAssetCategoryRequest request
    ) {

        return assetCategoryService.createAssetCategory(
                request
        );
    }
}