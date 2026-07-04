package com.nextalx.controller;

import com.nextalx.dto.request.CreateDepartmentRequest;
import com.nextalx.dto.response.DepartmentResponse;
import com.nextalx.entity.Department;
import com.nextalx.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }

    @PostMapping
    public DepartmentResponse createDepartment(
            @Valid @RequestBody CreateDepartmentRequest request
    ) {
        return departmentService.createDepartment(request);
    }
}