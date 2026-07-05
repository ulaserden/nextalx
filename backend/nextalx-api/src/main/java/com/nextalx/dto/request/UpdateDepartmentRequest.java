package com.nextalx.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateDepartmentRequest {

    @NotBlank
    private String name;

    private String description;
}