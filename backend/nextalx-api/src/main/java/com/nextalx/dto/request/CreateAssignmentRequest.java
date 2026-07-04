package com.nextalx.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateAssignmentRequest {

    @NotNull
    private Long employeeId;

    @NotNull
    private Long assetId;

    @NotNull
    private LocalDate assignedDate;

    private String note;
}