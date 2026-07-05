package com.nextalx.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
public class AssetResponse {

    private Long id;

    private String assetTag;

    private String name;

    private String brand;

    private String model;

    private String serialNumber;

    private LocalDate purchaseDate;

    private LocalDate warrantyEndDate;

    private BigDecimal purchasePrice;

    private String supplier;

    private String status;

    private Long categoryId;

    private String categoryName;
}