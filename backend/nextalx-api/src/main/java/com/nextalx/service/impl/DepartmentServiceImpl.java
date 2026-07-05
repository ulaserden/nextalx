package com.nextalx.service.impl;

import com.nextalx.dto.request.CreateDepartmentRequest;
import com.nextalx.dto.request.UpdateDepartmentRequest;
import com.nextalx.dto.response.DepartmentResponse;
import com.nextalx.entity.Department;
import com.nextalx.exception.DepartmentAlreadyExistsException;
import com.nextalx.exception.DepartmentNotFoundException;
import com.nextalx.mapper.DepartmentMapper;
import com.nextalx.repository.DepartmentRepository;
import com.nextalx.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl
        implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final DepartmentMapper departmentMapper;

    @Override
    public Page<DepartmentResponse> getAllDepartments(
            int page,
            int size
    ) {

        return departmentRepository.findAll(
                        PageRequest.of(
                                page,
                                size
                        )
                )
                .map(
                        departmentMapper::toResponse
                );
    }

    @Override
    public DepartmentResponse createDepartment(
            CreateDepartmentRequest request
    ) {

        if (departmentRepository.existsByName(
                request.getName()
        )) {

            throw new DepartmentAlreadyExistsException(
                    "Department already exists."
            );
        }

        Department department =
                departmentMapper.toEntity(
                        request
                );

        department.setStatus(
                "ACTIVE"
        );

        Department savedDepartment =
                departmentRepository.save(
                        department
                );

        return departmentMapper.toResponse(
                savedDepartment
        );
    }

    @Override
    public DepartmentResponse updateDepartment(
            Long id,
            UpdateDepartmentRequest request
    ) {

        Department department =
                departmentRepository.findById(id)
                        .orElseThrow(() ->
                                new DepartmentNotFoundException(
                                        "Department not found."
                                ));

        if (departmentRepository
                .existsByNameAndIdNot(
                        request.getName(),
                        id
                )) {

            throw new DepartmentAlreadyExistsException(
                    "Department already exists."
            );
        }

        department.setName(
                request.getName()
        );

        department.setDescription(
                request.getDescription()
        );

        Department updatedDepartment =
                departmentRepository.save(
                        department
                );

        return departmentMapper.toResponse(
                updatedDepartment
        );
    }

    @Override
    public DepartmentResponse deactivateDepartment(
            Long id
    ) {

        Department department =
                departmentRepository.findById(id)
                        .orElseThrow(() ->
                                new DepartmentNotFoundException(
                                        "Department not found."
                                ));

        department.setStatus(
                "INACTIVE"
        );

        return departmentMapper.toResponse(
                departmentRepository.save(
                        department
                )
        );
    }

    @Override
    public DepartmentResponse activateDepartment(
            Long id
    ) {

        Department department =
                departmentRepository.findById(id)
                        .orElseThrow(() ->
                                new DepartmentNotFoundException(
                                        "Department not found."
                                ));

        department.setStatus(
                "ACTIVE"
        );

        return departmentMapper.toResponse(
                departmentRepository.save(
                        department
                )
        );
    }
}