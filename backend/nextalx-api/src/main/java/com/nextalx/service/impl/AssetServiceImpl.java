package com.nextalx.service.impl;

import com.nextalx.dto.request.CreateAssetRequest;
import com.nextalx.dto.response.AssetResponse;
import com.nextalx.entity.Asset;
import com.nextalx.entity.AssetCategory;
import com.nextalx.exception.AssetAlreadyExistsException;
import com.nextalx.exception.AssetCategoryNotFoundException;
import com.nextalx.mapper.AssetMapper;
import com.nextalx.repository.AssetCategoryRepository;
import com.nextalx.repository.AssetRepository;
import com.nextalx.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;
    private final AssetCategoryRepository assetCategoryRepository;
    private final AssetMapper assetMapper;

    @Override
    public Page<AssetResponse> getAllAssets(
            int page,
            int size
    ) {

        return assetRepository.findAll(
                        PageRequest.of(
                                page,
                                size
                        )
                )
                .map(
                        assetMapper::toResponse
                );
    }

    @Override
    public AssetResponse createAsset(
            CreateAssetRequest request
    ) {

        if (assetRepository.existsByAssetTag(
                request.getAssetTag()
        )) {

            throw new AssetAlreadyExistsException(
                    "Asset tag already exists."
            );
        }

        if (request.getSerialNumber() != null
                && assetRepository.existsBySerialNumber(
                request.getSerialNumber()
        )) {

            throw new AssetAlreadyExistsException(
                    "Serial number already exists."
            );
        }

        AssetCategory category =
                assetCategoryRepository.findById(
                                request.getCategoryId()
                        )
                        .orElseThrow(() ->
                                new AssetCategoryNotFoundException(
                                        "Asset category not found."
                                ));

        Asset asset =
                assetMapper.toEntity(
                        request,
                        category
                );

        Asset savedAsset =
                assetRepository.save(
                        asset
                );

        return assetMapper.toResponse(
                savedAsset
        );
    }
}