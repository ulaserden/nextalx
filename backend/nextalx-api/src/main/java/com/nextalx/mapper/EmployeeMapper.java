package com.nextalx.mapper;

import com.nextalx.dto.request.CreateEmployeeRequest;
import com.nextalx.dto.response.EmployeeResponse;
import com.nextalx.entity.Department;
import com.nextalx.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class EmployeeMapper {

    public Employee toEntity(
            CreateEmployeeRequest request,
            Department department
    ) {

        Employee employee = new Employee();

        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());
        employee.setPhone(request.getPhone());
        employee.setJobTitle(request.getJobTitle());
        employee.setStatus(request.getStatus());

        employee.setDepartment(department);

        return employee;
    }

    public EmployeeResponse toResponse(Employee employee) {

        return EmployeeResponse.builder()
                .id(employee.getId())
                .firstName(employee.getFirstName())
                .lastName(employee.getLastName())
                .email(employee.getEmail())
                .phone(employee.getPhone())
                .jobTitle(employee.getJobTitle())
                .status(employee.getStatus())
                .departmentId(employee.getDepartment().getId())
                .departmentName(employee.getDepartment().getName())
                .build();
    }
}