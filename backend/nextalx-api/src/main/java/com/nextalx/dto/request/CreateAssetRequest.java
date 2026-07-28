package com.nextalx.dto.request;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class CreateAssetRequest {

    @NotBlank
    @Size(max = 50, message = "Asset tag cannot exceed 50 characters.")
    private String assetTag;

    @NotBlank
    @Size(max = 150, message = "Name cannot exceed 150 characters.")
    private String name;

    @Size(max = 100, message = "Brand cannot exceed 100 characters.")
    private String brand;

    @Size(max = 100, message = "Model cannot exceed 100 characters.")
    private String model;

    @Size(max = 100, message = "Serial number cannot exceed 100 characters.")
    private String serialNumber;

    private LocalDate purchaseDate;

    private LocalDate warrantyEndDate;

    @PositiveOrZero(message = "Purchase price cannot be negative.")
    @Digits(integer = 10, fraction = 2, message = "Purchase price is invalid.")
    private BigDecimal purchasePrice;

    @Size(max = 150, message = "Supplier cannot exceed 150 characters.")
    private String supplier;

    @NotNull
    private Long categoryId;
}
