package com.nextalx.controller;

import com.nextalx.dto.request.CreateAssetRequest;
import com.nextalx.dto.request.UpdateAssetRequest;
import com.nextalx.dto.response.AssetResponse;
import com.nextalx.service.AssetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetService assetService;

    @GetMapping
    public Page<AssetResponse> getAllAssets(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        return assetService.getAllAssets(
                page,
                size
        );
    }

    @PostMapping
    public AssetResponse createAsset(
            @Valid
            @RequestBody
            CreateAssetRequest request
    ) {

        return assetService.createAsset(
                request
        );
    }

    @PutMapping("/{id}")
    public AssetResponse updateAsset(
            @PathVariable Long id,

            @Valid
            @RequestBody
            UpdateAssetRequest request
    ) {

        return assetService.updateAsset(
                id,
                request
        );
    }

    @PatchMapping("/{id}/available")
    public AssetResponse setAvailable(
            @PathVariable Long id
    ) {
        return assetService.setAvailable(
                id
        );
    }

    @PatchMapping("/{id}/repair")
    public AssetResponse setInRepair(
            @PathVariable Long id
    ) {
        return assetService.setInRepair(
                id
        );
    }

    @PatchMapping("/{id}/retire")
    public AssetResponse setRetired(
            @PathVariable Long id
    ) {
        return assetService.setRetired(
                id
        );
    }

    @PatchMapping("/{id}/lost")
    public AssetResponse setLost(
            @PathVariable Long id
    ) {
        return assetService.setLost(
                id
        );
    }

    @PatchMapping("/{id}/broken")
    public AssetResponse setBroken(
            @PathVariable Long id
    ) {
        return assetService.setBroken(
                id
        );
    }
}