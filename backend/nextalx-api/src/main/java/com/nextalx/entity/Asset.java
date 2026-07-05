package com.nextalx.entity;

import com.nextalx.enums.AssetStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "assets")
public class Asset extends BaseEntity {

    @Column(
            nullable = false,
            unique = true,
            length = 50
    )
    private String assetTag;

    @Column(
            nullable = false,
            length = 150
    )
    private String name;

    @Column(length = 100)
    private String brand;

    @Column(length = 100)
    private String model;

    @Column(
            unique = true,
            length = 100
    )
    private String serialNumber;

    private LocalDate purchaseDate;

    private LocalDate warrantyEndDate;

    @Column(
            precision = 12,
            scale = 2
    )
    private BigDecimal purchasePrice;

    @Column(length = 150)
    private String supplier;

    @Enumerated(
            EnumType.STRING
    )
    @Column(
            nullable = false,
            length = 30
    )
    private AssetStatus status =
            AssetStatus.AVAILABLE;

    @ManyToOne(
            fetch = FetchType.EAGER
    )
    @JoinColumn(
            name = "category_id",
            nullable = false
    )
    private Category category;
}