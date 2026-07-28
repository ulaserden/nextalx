package com.nextalx.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class UpdateAssetRequest {

    @NotBlank
    private String assetTag;

    @NotBlank
    private String name;

    private String brand;

    private String model;

    private String serialNumber;

    private LocalDate purchaseDate;

    private LocalDate warrantyEndDate;

    private BigDecimal purchasePrice;

    private String supplier;

    @Pattern(
            regexp = "^(AVAILABLE|ASSIGNED|IN_REPAIR|RETIRED|LOST|BROKEN)?$",
            message = "status must be one of AVAILABLE, ASSIGNED, IN_REPAIR, RETIRED, LOST, BROKEN."
    )
    private String status;

    @NotNull
    private Long categoryId;
}