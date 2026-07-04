package com.nextalx.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class AssignmentResponse {

    private Long id;

    private Long employeeId;
    private String employeeName;

    private Long assetId;
    private String assetTag;

    private LocalDate assignedDate;
    private LocalDate returnedDate;

    private String note;
}