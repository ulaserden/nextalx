package com.nextalx.service;

import com.nextalx.dto.request.CreateEmployeeRequest;
import com.nextalx.dto.response.EmployeeResponse;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse createEmployee(
            CreateEmployeeRequest request
    );

    List<EmployeeResponse> getAllEmployees();

}