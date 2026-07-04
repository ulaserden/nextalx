package com.nextalx.dto.request;

import com.nextalx.enums.AssetStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateAssetRequest {

    @NotBlank
    private String assetTag;

    private String serialNumber;

    @NotBlank
    private String brand;

    @NotBlank
    private String model;

    private LocalDate purchaseDate;

    private LocalDate warrantyEndDate;

    @NotNull
    private AssetStatus status;

    @NotNull
    private Long categoryId;
}