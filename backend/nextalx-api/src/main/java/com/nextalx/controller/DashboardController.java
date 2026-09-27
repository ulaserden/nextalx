package com.nextalx.controller;

import com.nextalx.dto.response.AssetResponse;
import com.nextalx.dto.response.DashboardStatsResponse;
import com.nextalx.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    public DashboardStatsResponse getDashboardStats() {

        return dashboardService.getDashboardStats();
    }

    @GetMapping("/expiring-warranties")
    public List<AssetResponse> getExpiringWarranties(

            @RequestParam(
                    defaultValue = "5"
            )
            int limit
    ) {

        return dashboardService.getExpiringWarranties(
                limit
        );
    }
}