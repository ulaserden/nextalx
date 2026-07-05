package com.nextalx.service;

import com.nextalx.dto.request.CreateDepartmentRequest;
import com.nextalx.dto.request.UpdateDepartmentRequest;
import com.nextalx.dto.response.DepartmentResponse;
import org.springframework.data.domain.Page;

public interface DepartmentService {

    Page<DepartmentResponse> getAllDepartments(
            int page,
            int size
    );

    DepartmentResponse createDepartment(
            CreateDepartmentRequest request
    );

    DepartmentResponse updateDepartment(
            Long id,
            UpdateDepartmentRequest request
    );

    DepartmentResponse deactivateDepartment(
            Long id
    );

    DepartmentResponse activateDepartment(
            Long id
    );
}