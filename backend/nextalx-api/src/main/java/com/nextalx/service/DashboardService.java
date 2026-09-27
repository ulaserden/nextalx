package com.nextalx.service;

import com.nextalx.dto.response.AssetResponse;
import com.nextalx.dto.response.DashboardStatsResponse;

import java.util.List;

public interface DashboardService {

    DashboardStatsResponse getDashboardStats();

    /**
     * In-service assets whose warranty ends within the expiring window,
     * soonest first.
     */
    List<AssetResponse> getExpiringWarranties(
            int limit
    );
}
