package com.nextalx.service.impl;

import com.nextalx.dto.request.CreateAssetRequest;
import com.nextalx.dto.request.UpdateAssetRequest;
import com.nextalx.dto.response.AssetResponse;
import com.nextalx.entity.Asset;
import com.nextalx.entity.Category;
import com.nextalx.enums.AssetStatus;
import com.nextalx.exception.AssetAlreadyExistsException;
import com.nextalx.exception.AssetNotFoundException;
import com.nextalx.exception.CategoryNotFoundException;
import com.nextalx.mapper.AssetMapper;
import com.nextalx.repository.AssetRepository;
import com.nextalx.repository.CategoryRepository;
import com.nextalx.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AssetServiceImpl
        implements AssetService {

    private final AssetRepository assetRepository;
    private final CategoryRepository categoryRepository;
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

        if (
                assetRepository.existsByAssetTag(
                        request.getAssetTag()
                )
        ) {

            throw new AssetAlreadyExistsException(
                    "Asset tag already exists."
            );
        }

        if (
                request.getSerialNumber() != null
                        && !request.getSerialNumber().isBlank()
                        && assetRepository.existsBySerialNumber(
                        request.getSerialNumber()
                )
        ) {

            throw new AssetAlreadyExistsException(
                    "Serial number already exists."
            );
        }

        Category category =
                categoryRepository.findById(
                        request.getCategoryId()
                ).orElseThrow(() ->
                        new CategoryNotFoundException(
                                "Category not found."
                        )
                );

        Asset asset =
                assetMapper.toEntity(
                        request,
                        category
                );

        asset.setStatus(
                AssetStatus.AVAILABLE
        );

        Asset savedAsset =
                assetRepository.save(
                        asset
                );

        return assetMapper.toResponse(
                savedAsset
        );
    }

    @Override
    public AssetResponse updateAsset(
            Long id,
            UpdateAssetRequest request
    ) {

        Asset asset =
                assetRepository.findById(id)
                        .orElseThrow(() ->
                                new AssetNotFoundException(
                                        "Asset not found."
                                )
                        );

        if (
                assetRepository.existsByAssetTagAndIdNot(
                        request.getAssetTag(),
                        id
                )
        ) {

            throw new AssetAlreadyExistsException(
                    "Asset tag already exists."
            );
        }

        Category category =
                categoryRepository.findById(
                        request.getCategoryId()
                ).orElseThrow(() ->
                        new CategoryNotFoundException(
                                "Category not found."
                        )
                );

        asset.setAssetTag(
                request.getAssetTag()
        );

        asset.setName(
                request.getName()
        );

        asset.setBrand(
                request.getBrand()
        );

        asset.setModel(
                request.getModel()
        );

        asset.setSerialNumber(
                request.getSerialNumber()
        );

        asset.setPurchaseDate(
                request.getPurchaseDate()
        );

        asset.setWarrantyEndDate(
                request.getWarrantyEndDate()
        );

        asset.setPurchasePrice(
                request.getPurchasePrice()
        );

        asset.setSupplier(
                request.getSupplier()
        );

        asset.setCategory(
                category
        );

        if (
                request.getStatus() != null
                        && !request.getStatus().isBlank()
        ) {

            asset.setStatus(
                    AssetStatus.valueOf(
                            request.getStatus()
                    )
            );
        }

        Asset updatedAsset =
                assetRepository.save(
                        asset
                );

        return assetMapper.toResponse(
                updatedAsset
        );
    }

    @Override
    public AssetResponse setAvailable(
            Long id
    ) {

        return updateStatus(
                id,
                AssetStatus.AVAILABLE
        );
    }

    @Override
    public AssetResponse setInRepair(
            Long id
    ) {

        return updateStatus(
                id,
                AssetStatus.IN_REPAIR
        );
    }

    @Override
    public AssetResponse setRetired(
            Long id
    ) {

        return updateStatus(
                id,
                AssetStatus.RETIRED
        );
    }

    @Override
    public AssetResponse setLost(
            Long id
    ) {

        return updateStatus(
                id,
                AssetStatus.LOST
        );
    }

    @Override
    public AssetResponse setBroken(
            Long id
    ) {

        return updateStatus(
                id,
                AssetStatus.BROKEN
        );
    }

    private AssetResponse updateStatus(
            Long id,
            AssetStatus status
    ) {

        Asset asset =
                assetRepository.findById(id)
                        .orElseThrow(() ->
                                new AssetNotFoundException(
                                        "Asset not found."
                                )
                        );

        asset.setStatus(
                status
        );

        Asset updatedAsset =
                assetRepository.save(
                        asset
                );

        return assetMapper.toResponse(
                updatedAsset
        );
    }
}