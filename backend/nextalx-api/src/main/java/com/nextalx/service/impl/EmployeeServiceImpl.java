package com.nextalx.service.impl;

import com.nextalx.dto.request.CreateEmployeeRequest;
import com.nextalx.dto.response.EmployeeResponse;
import com.nextalx.entity.Department;
import com.nextalx.entity.Employee;
import com.nextalx.exception.DepartmentNotFoundException;
import com.nextalx.exception.EmployeeAlreadyExistsException;
import com.nextalx.mapper.EmployeeMapper;
import com.nextalx.repository.DepartmentRepository;
import com.nextalx.repository.EmployeeRepository;
import com.nextalx.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl
        implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeMapper employeeMapper;

    @Override
    public EmployeeResponse createEmployee(
            CreateEmployeeRequest request
    ) {

        if (employeeRepository.existsByEmail(
                request.getEmail())) {

            throw new EmployeeAlreadyExistsException(
                    "Employee email already exists."
            );
        }

        Department department =
                departmentRepository.findById(
                        request.getDepartmentId()
                ).orElseThrow(() ->
                        new DepartmentNotFoundException(
                                "Department not found."
                        ));

        Employee employee =
                employeeMapper.toEntity(
                        request,
                        department
                );

        Employee savedEmployee =
                employeeRepository.save(employee);

        return employeeMapper.toResponse(
                savedEmployee
        );
    }

    @Override
    public List<EmployeeResponse> getAllEmployees() {

        return employeeRepository.findAll()
                .stream()
                .map(employeeMapper::toResponse)
                .toList();
    }
}