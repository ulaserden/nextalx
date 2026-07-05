package com.nextalx.mapper;

import com.nextalx.dto.request.CreateAssetRequest;
import com.nextalx.dto.response.AssetResponse;
import com.nextalx.entity.Asset;
import com.nextalx.entity.Category;
import com.nextalx.enums.AssetStatus;
import org.springframework.stereotype.Component;

@Component
public class AssetMapper {

    public Asset toEntity(
            CreateAssetRequest request,
            Category category
    ) {

        Asset asset =
                new Asset();

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

        asset.setStatus(
                AssetStatus.AVAILABLE
        );

        asset.setCategory(
                category
        );

        return asset;
    }

    public AssetResponse toResponse(
            Asset asset
    ) {

        return AssetResponse.builder()
                .id(
                        asset.getId()
                )
                .assetTag(
                        asset.getAssetTag()
                )
                .name(
                        asset.getName()
                )
                .brand(
                        asset.getBrand()
                )
                .model(
                        asset.getModel()
                )
                .serialNumber(
                        asset.getSerialNumber()
                )
                .purchaseDate(
                        asset.getPurchaseDate()
                )
                .warrantyEndDate(
                        asset.getWarrantyEndDate()
                )
                .purchasePrice(
                        asset.getPurchasePrice()
                )
                .supplier(
                        asset.getSupplier()
                )
                .status(
                        asset.getStatus().name()
                )
                .categoryId(
                        asset.getCategory().getId()
                )
                .categoryName(
                        asset.getCategory().getName()
                )
                .build();
    }
}