package com.nextalx.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateEmployeeRequest {

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @Email
    @NotBlank
    private String email;

    private String phone;

    private String jobTitle;

    @NotBlank
    @Pattern(
            regexp = "ACTIVE|INACTIVE",
            message = "status must be ACTIVE or INACTIVE."
    )
    private String status;

    @NotNull
    private Long departmentId;
}