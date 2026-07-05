package com.nextalx.service.impl;

import com.nextalx.dto.response.DashboardStatsResponse;
import com.nextalx.enums.AssetStatus;
import com.nextalx.repository.AssetRepository;
import com.nextalx.repository.EmployeeRepository;
import com.nextalx.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private final EmployeeRepository employeeRepository;
    private final AssetRepository assetRepository;

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
                .build();
    }
}