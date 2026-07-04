package com.nextalx.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EmployeeResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String jobTitle;

    private String status;

    private Long departmentId;

    private String departmentName;
}