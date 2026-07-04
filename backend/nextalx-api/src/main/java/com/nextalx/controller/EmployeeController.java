package com.nextalx.controller;

import com.nextalx.dto.request.CreateEmployeeRequest;
import com.nextalx.dto.response.EmployeeResponse;
import com.nextalx.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public List<EmployeeResponse> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public EmployeeResponse createEmployee(
            @Valid @RequestBody CreateEmployeeRequest request
    ) {
        return employeeService.createEmployee(request);
    }
}