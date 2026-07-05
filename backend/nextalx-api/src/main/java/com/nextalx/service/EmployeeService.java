package com.nextalx.service;

import com.nextalx.dto.request.CreateEmployeeRequest;
import com.nextalx.dto.request.UpdateEmployeeRequest;
import com.nextalx.dto.response.EmployeeResponse;
import org.springframework.data.domain.Page;

public interface EmployeeService {

    EmployeeResponse createEmployee(
            CreateEmployeeRequest request
    );

    EmployeeResponse updateEmployee(
            Long id,
            UpdateEmployeeRequest request
    );

    EmployeeResponse deactivateEmployee(
            Long id
    );

    EmployeeResponse activateEmployee(
            Long id
    );

    Page<EmployeeResponse> getAllEmployees(
            int page,
            int size
    );
}