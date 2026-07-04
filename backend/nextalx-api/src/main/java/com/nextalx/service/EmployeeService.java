package com.nextalx.service;

import com.nextalx.dto.request.CreateEmployeeRequest;
import com.nextalx.dto.response.EmployeeResponse;
import org.springframework.data.domain.Page;

public interface EmployeeService {

    EmployeeResponse createEmployee(
            CreateEmployeeRequest request
    );

    Page<EmployeeResponse> getAllEmployees(
            int page,
            int size
    );

}