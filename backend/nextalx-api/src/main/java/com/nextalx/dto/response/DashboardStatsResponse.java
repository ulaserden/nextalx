package com.nextalx.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DashboardStatsResponse {

    private Long totalDepartments;

    private Long totalEmployees;

    private Long totalAssets;

    private Long assignedAssets;

    private Long availableAssets;

    private Long totalCategories;
}