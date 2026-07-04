package com.nextalx.service;

import com.nextalx.dto.request.CreateDepartmentRequest;
import com.nextalx.dto.response.DepartmentResponse;
import com.nextalx.entity.Department;

import java.util.List;

public interface DepartmentService {

    List<Department> getAllDepartments();

    DepartmentResponse createDepartment(CreateDepartmentRequest request);

}