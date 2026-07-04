package com.nextalx.mapper;

import com.nextalx.dto.request.CreateAssetRequest;
import com.nextalx.dto.response.AssetResponse;
import com.nextalx.entity.Asset;
import com.nextalx.entity.AssetCategory;
import org.springframework.stereotype.Component;

@Component
public class AssetMapper {

    public Asset toEntity(
            CreateAssetRequest request,
            AssetCategory category
    ) {

        Asset asset = new Asset();

        asset.setAssetTag(request.getAssetTag());
        asset.setSerialNumber(request.getSerialNumber());
        asset.setBrand(request.getBrand());
        asset.setModel(request.getModel());
        asset.setPurchaseDate(request.getPurchaseDate());
        asset.setWarrantyEndDate(request.getWarrantyEndDate());
        asset.setStatus(request.getStatus());
        asset.setCategory(category);

        return asset;
    }

    public AssetResponse toResponse(
            Asset asset
    ) {

        return AssetResponse.builder()
                .id(asset.getId())
                .assetTag(asset.getAssetTag())
                .serialNumber(asset.getSerialNumber())
                .brand(asset.getBrand())
                .model(asset.getModel())
                .purchaseDate(asset.getPurchaseDate())
                .warrantyEndDate(asset.getWarrantyEndDate())
                .status(asset.getStatus())
                .categoryId(asset.getCategory().getId())
                .categoryName(asset.getCategory().getName())
                .build();
    }
}