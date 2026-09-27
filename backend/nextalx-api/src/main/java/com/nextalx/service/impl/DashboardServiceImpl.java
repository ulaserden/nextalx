package com.nextalx.service.impl;

import com.nextalx.dto.response.AssetResponse;
import com.nextalx.dto.response.DashboardStatsResponse;
import com.nextalx.enums.AssetStatus;
import com.nextalx.enums.WarrantyStatus;
import com.nextalx.mapper.AssetMapper;
import com.nextalx.repository.AssetRepository;
import com.nextalx.repository.EmployeeRepository;
import com.nextalx.service.DashboardService;
import com.nextalx.service.WarrantyPolicy;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private static final int MAX_WARRANTY_LIMIT = 50;

    private final EmployeeRepository employeeRepository;
    private final AssetRepository assetRepository;
    private final AssetMapper assetMapper;
    private final WarrantyPolicy warrantyPolicy;

    @Override
    public DashboardStatsResponse getDashboardStats() {

        long totalEmployees =
                employeeRepository.count();

        long totalAssets =
                assetRepository.count();

        long assignedAssets =
                assetRepository.countByStatus(
                        AssetStatus.ASSIGNED
                );

        long availableAssets =
                assetRepository.countByStatus(
                        AssetStatus.AVAILABLE
                );

        long warrantyExpiringAssets =
                assetRepository.count(
                        warrantyPolicy.matching(
                                WarrantyStatus.EXPIRING
                        )
                );

        long warrantyExpiredAssets =
                assetRepository.count(
                        warrantyPolicy.matching(
                                WarrantyStatus.EXPIRED
                        )
                );

        return DashboardStatsResponse.builder()
                .totalEmployees(
                        totalEmployees
                )
                .totalAssets(
                        totalAssets
                )
                .assignedAssets(
                        assignedAssets
                )
                .availableAssets(
                        availableAssets
                )
                .warrantyExpiringAssets(
                        warrantyExpiringAssets
                )
                .warrantyExpiredAssets(
                        warrantyExpiredAssets
                )
                .warrantyExpiringWithinDays(
                        warrantyPolicy.getExpiringWithinDays()
                )
                .build();
    }

    @Override
    public List<AssetResponse> getExpiringWarranties(
            int limit
    ) {

        int pageSize =
                Math.clamp(limit, 1, MAX_WARRANTY_LIMIT);

        return assetRepository.findAll(
                        warrantyPolicy.matching(
                                WarrantyStatus.EXPIRING
                        ),
                        PageRequest.of(
                                0,
                                pageSize,
                                Sort.by("warrantyEndDate", "id")
                        )
                )
                .map(
                        assetMapper::toResponse
                )
                .getContent();
    }
}
