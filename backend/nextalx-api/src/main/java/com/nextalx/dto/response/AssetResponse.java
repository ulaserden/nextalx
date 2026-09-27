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

    /**
     * VALID, EXPIRING or EXPIRED; null when the asset has no warranty end
     * date or is out of service (RETIRED, LOST). See WarrantyPolicy.
     */
    private String warrantyStatus;

    /**
     * Days until the warranty ends (negative once expired); null whenever
     * warrantyStatus is null.
     */
    private Long warrantyDaysRemaining;

    private BigDecimal purchasePrice;

    private String supplier;

    private String status;

    private Long categoryId;

    private String categoryName;
}