package com.nextalx.service.impl;

import com.nextalx.dto.request.CreateAssetCategoryRequest;
import com.nextalx.dto.response.AssetCategoryResponse;
import com.nextalx.entity.AssetCategory;
import com.nextalx.exception.AssetCategoryAlreadyExistsException;
import com.nextalx.mapper.AssetCategoryMapper;
import com.nextalx.repository.AssetCategoryRepository;
import com.nextalx.service.AssetCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssetCategoryServiceImpl
        implements AssetCategoryService {

    private final AssetCategoryRepository assetCategoryRepository;
    private final AssetCategoryMapper assetCategoryMapper;

    @Override
    public Page<AssetCategoryResponse> getAllAssetCategories(
            int page,
            int size
    ) {

        return assetCategoryRepository.findAll(
                        PageRequest.of(
                                page,
                                size
                        )
                )
                .map(
                        assetCategoryMapper::toResponse
                );
    }

    @Override
    public AssetCategoryResponse createAssetCategory(
            CreateAssetCategoryRequest request
    ) {

        if (assetCategoryRepository.existsByName(
                request.getName()
        )) {

            throw new AssetCategoryAlreadyExistsException(
                    "Asset category already exists."
            );
        }

        AssetCategory category =
                assetCategoryMapper.toEntity(
                        request
                );

        AssetCategory savedCategory =
                assetCategoryRepository.save(
                        category
                );

        return assetCategoryMapper.toResponse(
                savedCategory
        );
    }
}