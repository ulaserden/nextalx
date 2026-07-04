package com.nextalx.mapper;

import com.nextalx.dto.request.CreateAssetCategoryRequest;
import com.nextalx.dto.response.AssetCategoryResponse;
import com.nextalx.entity.AssetCategory;
import org.springframework.stereotype.Component;

@Component
public class AssetCategoryMapper {

    public AssetCategory toEntity(
            CreateAssetCategoryRequest request
    ) {

        AssetCategory category = new AssetCategory();

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        return category;
    }

    public AssetCategoryResponse toResponse(
            AssetCategory category
    ) {

        return AssetCategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }
}