package com.nextalx.controller;

import com.nextalx.dto.request.CreateEmployeeRequest;
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
}