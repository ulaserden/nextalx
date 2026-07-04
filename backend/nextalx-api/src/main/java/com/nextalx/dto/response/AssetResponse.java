package com.nextalx.dto.response;

import com.nextalx.enums.AssetStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class AssetResponse {

    private Long id;

    private String assetTag;

    private String serialNumber;

    private String brand;

    private String model;

    private LocalDate purchaseDate;

    private LocalDate warrantyEndDate;

    private AssetStatus status;

    private Long categoryId;

    private String categoryName;
}