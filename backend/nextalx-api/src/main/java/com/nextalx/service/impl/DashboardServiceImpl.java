package com.nextalx.service.impl;

import com.nextalx.dto.response.DashboardStatsResponse;
import com.nextalx.enums.AssetStatus;
import com.nextalx.repository.AssetCategoryRepository;
import com.nextalx.repository.AssetRepository;
import com.nextalx.repository.DepartmentRepository;
import com.nextalx.repository.EmployeeRepository;
import com.nextalx.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl
        implements DashboardService {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;
    private final AssetRepository assetRepository;
    private final AssetCategoryRepository assetCategoryRepository;

    @Override
    public DashboardStatsResponse getStats() {

        return DashboardStatsResponse.builder()
                .totalDepartments(
                        departmentRepository.count()
                )
                .totalEmployees(
                        employeeRepository.count()
                )
                .totalAssets(
                        assetRepository.count()
                )
                .assignedAssets(
                        assetRepository.countByStatus(
                                AssetStatus.ASSIGNED
                        )
                )
                .availableAssets(
                        assetRepository.countByStatus(
                                AssetStatus.AVAILABLE
                        )
                )
                .totalCategories(
                        assetCategoryRepository.count()
                )
                .build();
    }
}