package com.nextalx.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateAssignmentRequest {

    private Long employeeId;

    private Long assetId;

    private LocalDate assignedDate;

    private LocalDate expectedReturnDate;

    private String note;
}