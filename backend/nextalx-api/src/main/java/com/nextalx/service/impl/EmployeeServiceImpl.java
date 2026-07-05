package com.nextalx.service.impl;

import com.nextalx.dto.request.CreateEmployeeRequest;
import com.nextalx.dto.request.UpdateEmployeeRequest;
import com.nextalx.dto.response.EmployeeResponse;
import com.nextalx.entity.Department;
import com.nextalx.entity.Employee;
import com.nextalx.exception.DepartmentNotFoundException;
import com.nextalx.exception.EmployeeAlreadyExistsException;
import com.nextalx.exception.EmployeeNotFoundException;
import com.nextalx.mapper.EmployeeMapper;
import com.nextalx.repository.DepartmentRepository;
import com.nextalx.repository.EmployeeRepository;
import com.nextalx.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

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
                employeeRepository.save(
                        employee
                );

        return employeeMapper.toResponse(
                savedEmployee
        );
    }

    @Override
    public EmployeeResponse updateEmployee(
            Long id,
            UpdateEmployeeRequest request
    ) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new EmployeeNotFoundException(
                                        "Employee not found."
                                ));

        if (employeeRepository
                .existsByEmailAndIdNot(
                        request.getEmail(),
                        id
                )) {

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

        employee.setFirstName(
                request.getFirstName()
        );

        employee.setLastName(
                request.getLastName()
        );

        employee.setEmail(
                request.getEmail()
        );

        employee.setPhone(
                request.getPhone()
        );

        employee.setJobTitle(
                request.getJobTitle()
        );

        employee.setStatus(
                request.getStatus()
        );

        employee.setDepartment(
                department
        );

        Employee updatedEmployee =
                employeeRepository.save(
                        employee
                );

        return employeeMapper.toResponse(
                updatedEmployee
        );
    }

    @Override
    public EmployeeResponse deactivateEmployee(
            Long id
    ) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new EmployeeNotFoundException(
                                        "Employee not found."
                                ));

        employee.setStatus(
                "INACTIVE"
        );

        Employee updatedEmployee =
                employeeRepository.save(
                        employee
                );

        return employeeMapper.toResponse(
                updatedEmployee
        );
    }

    @Override
    public EmployeeResponse activateEmployee(
            Long id
    ) {

        Employee employee =
                employeeRepository.findById(id)
                        .orElseThrow(() ->
                                new EmployeeNotFoundException(
                                        "Employee not found."
                                ));

        employee.setStatus(
                "ACTIVE"
        );

        Employee updatedEmployee =
                employeeRepository.save(
                        employee
                );

        return employeeMapper.toResponse(
                updatedEmployee
        );
    }

    @Override
    public Page<EmployeeResponse> getAllEmployees(
            int page,
            int size
    ) {

        return employeeRepository.findAll(
                        PageRequest.of(
                                page,
                                size
                        )
                )
                .map(
                        employeeMapper::toResponse
                );
    }
}