package com.nextalx.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateEmployeeRequest {

    @NotBlank
    @Size(max = 100, message = "First name cannot exceed 100 characters.")
    private String firstName;

    @NotBlank
    @Size(max = 100, message = "Last name cannot exceed 100 characters.")
    private String lastName;

    @Email
    @NotBlank
    @Size(max = 255, message = "Email cannot exceed 255 characters.")
    private String email;

    @Size(max = 20, message = "Phone cannot exceed 20 characters.")
    private String phone;

    @Size(max = 100, message = "Job title cannot exceed 100 characters.")
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
