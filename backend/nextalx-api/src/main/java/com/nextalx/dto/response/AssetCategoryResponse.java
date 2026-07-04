package com.nextalx.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AssetCategoryResponse {

    private Long id;
    private String name;
    private String description;
}