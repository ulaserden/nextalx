package com.nextalx.controller;

import com.nextalx.dto.request.CreateEmployeeRequest;
import com.nextalx.dto.request.UpdateEmployeeRequest;
import com.nextalx.dto.response.EmployeeResponse;
import com.nextalx.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public Page<EmployeeResponse> getAllEmployees(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size

    ) {

        return employeeService.getAllEmployees(
                page,
                size
        );
    }

    @PostMapping
    public EmployeeResponse createEmployee(
            @Valid
            @RequestBody
            CreateEmployeeRequest request
    ) {

        return employeeService.createEmployee(
                request
        );
    }

    @PutMapping("/{id}")
    public EmployeeResponse updateEmployee(
            @PathVariable Long id,

            @Valid
            @RequestBody
            UpdateEmployeeRequest request
    ) {

        return employeeService.updateEmployee(
                id,
                request
        );
    }

    @PatchMapping("/{id}/deactivate")
    public EmployeeResponse deactivateEmployee(
            @PathVariable Long id
    ) {

        return employeeService.deactivateEmployee(
                id
        );
    }

    @PatchMapping("/{id}/activate")
    public EmployeeResponse activateEmployee(
            @PathVariable Long id
    ) {

        return employeeService.activateEmployee(
                id
        );
    }
}