package com.nextalx.controller;

import com.nextalx.dto.request.CreateDepartmentRequest;
import com.nextalx.dto.request.UpdateDepartmentRequest;
import com.nextalx.dto.response.DepartmentResponse;
import com.nextalx.service.DepartmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    public Page<DepartmentResponse> getAllDepartments(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size

    ) {

        return departmentService.getAllDepartments(
                page,
                size
        );
    }

    @PostMapping
    public DepartmentResponse createDepartment(
            @Valid
            @RequestBody
            CreateDepartmentRequest request
    ) {

        return departmentService.createDepartment(
                request
        );
    }

    @PutMapping("/{id}")
    public DepartmentResponse updateDepartment(
            @PathVariable Long id,

            @Valid
            @RequestBody
            UpdateDepartmentRequest request
    ) {

        return departmentService.updateDepartment(
                id,
                request
        );
    }

    @PatchMapping("/{id}/deactivate")
    public DepartmentResponse deactivateDepartment(
            @PathVariable Long id
    ) {

        return departmentService.deactivateDepartment(
                id
        );
    }

    @PatchMapping("/{id}/activate")
    public DepartmentResponse activateDepartment(
            @PathVariable Long id
    ) {

        return departmentService.activateDepartment(
                id
        );
    }
}