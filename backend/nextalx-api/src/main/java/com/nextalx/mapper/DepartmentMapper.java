package com.nextalx.mapper;

import com.nextalx.dto.request.CreateDepartmentRequest;
import com.nextalx.dto.response.DepartmentResponse;
import com.nextalx.entity.Department;
import org.springframework.stereotype.Component;

@Component
public class DepartmentMapper {

    public Department toEntity(
            CreateDepartmentRequest request
    ) {

        Department department =
                new Department();

        department.setName(
                request.getName()
        );

        department.setDescription(
                request.getDescription()
        );

        department.setStatus(
                "ACTIVE"
        );

        return department;
    }

    public DepartmentResponse toResponse(
            Department department
    ) {

        return DepartmentResponse.builder()
                .id(
                        department.getId()
                )
                .name(
                        department.getName()
                )
                .description(
                        department.getDescription()
                )
                .status(
                        department.getStatus()
                )
                .build();
    }
}