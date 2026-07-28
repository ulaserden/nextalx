package com.nextalx.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateAssignmentRequest {

    @NotNull(message = "employeeId is required.")
    private Long employeeId;

    @NotNull(message = "assetId is required.")
    private Long assetId;

    @NotNull(message = "assignedDate is required.")
    private LocalDate assignedDate;

    private LocalDate expectedReturnDate;

    private String note;
}