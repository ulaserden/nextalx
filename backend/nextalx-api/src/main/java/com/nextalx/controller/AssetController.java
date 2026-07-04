package com.nextalx.controller;

import com.nextalx.dto.request.CreateAssetRequest;
import com.nextalx.dto.response.AssetResponse;
import com.nextalx.service.AssetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @GetMapping
    public List<AssetResponse> getAllAssets() {
        return assetService.getAllAssets();
    }

    @PostMapping
    public AssetResponse createAsset(
            @Valid
            @RequestBody
            CreateAssetRequest request
    ) {
        return assetService.createAsset(request);
    }
}