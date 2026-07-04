package com.nextalx.service.impl;

import com.nextalx.dto.request.CreateDepartmentRequest;
import com.nextalx.dto.response.DepartmentResponse;
import com.nextalx.entity.Department;
import com.nextalx.exception.DepartmentAlreadyExistsException;
import com.nextalx.mapper.DepartmentMapper;
import com.nextalx.repository.DepartmentRepository;
import com.nextalx.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final DepartmentMapper departmentMapper;

    @Override
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Override
    public DepartmentResponse createDepartment(CreateDepartmentRequest request) {

        if (departmentRepository.existsByName(request.getName())) {
            throw new DepartmentAlreadyExistsException(
                    "Department already exists."
            );
        }

        Department department = departmentMapper.toEntity(request);

        Department savedDepartment = departmentRepository.save(department);

        return departmentMapper.toResponse(savedDepartment);
    }
}