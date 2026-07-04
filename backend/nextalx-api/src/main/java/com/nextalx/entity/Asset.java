package com.nextalx.entity;

import com.nextalx.enums.AssetStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "assets")
public class Asset extends BaseEntity {

    @Column(
            name = "asset_tag",
            nullable = false,
            unique = true
    )
    private String assetTag;

    @Column(
            name = "serial_number",
            unique = true
    )
    private String serialNumber;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String model;

    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    @Column(name = "warranty_end_date")
    private LocalDate warrantyEndDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetStatus status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "category_id",
            nullable = false
    )
    private AssetCategory category;
}