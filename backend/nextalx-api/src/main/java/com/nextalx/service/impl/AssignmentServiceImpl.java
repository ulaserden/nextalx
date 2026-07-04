package com.nextalx.service.impl;

import com.nextalx.dto.request.CreateAssignmentRequest;
import com.nextalx.dto.response.AssignmentResponse;
import com.nextalx.entity.Asset;
import com.nextalx.entity.Assignment;
import com.nextalx.entity.Employee;
import com.nextalx.enums.AssetStatus;
import com.nextalx.exception.AssetAlreadyAssignedException;
import com.nextalx.exception.AssetNotFoundException;
import com.nextalx.exception.AssignmentNotFoundException;
import com.nextalx.exception.EmployeeNotFoundException;
import com.nextalx.mapper.AssignmentMapper;
import com.nextalx.repository.AssetRepository;
import com.nextalx.repository.AssignmentRepository;
import com.nextalx.repository.EmployeeRepository;
import com.nextalx.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AssignmentServiceImpl
        implements AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final EmployeeRepository employeeRepository;
    private final AssetRepository assetRepository;
    private final AssignmentMapper assignmentMapper;

    @Override
    public Page<AssignmentResponse> getAllAssignments(
            int page,
            int size
    ) {

        return assignmentRepository.findAll(
                        PageRequest.of(
                                page,
                                size
                        )
                )
                .map(
                        assignmentMapper::toResponse
                );
    }

    @Override
    public AssignmentResponse createAssignment(
            CreateAssignmentRequest request
    ) {

        Employee employee =
                employeeRepository.findById(
                                request.getEmployeeId()
                        )
                        .orElseThrow(() ->
                                new EmployeeNotFoundException(
                                        "Employee not found."
                                ));

        Asset asset =
                assetRepository.findById(
                                request.getAssetId()
                        )
                        .orElseThrow(() ->
                                new AssetNotFoundException(
                                        "Asset not found."
                                ));

        if (assignmentRepository
                .existsByAssetIdAndReturnedDateIsNull(
                        asset.getId()
                )) {

            throw new AssetAlreadyAssignedException(
                    "Asset is already assigned."
            );
        }

        Assignment assignment =
                assignmentMapper.toEntity(
                        request,
                        employee,
                        asset
                );

        asset.setStatus(
                AssetStatus.ASSIGNED
        );

        assetRepository.save(
                asset
        );

        Assignment savedAssignment =
                assignmentRepository.save(
                        assignment
                );

        return assignmentMapper.toResponse(
                savedAssignment
        );
    }

    @Override
    public AssignmentResponse returnAsset(
            Long assignmentId
    ) {

        Assignment assignment =
                assignmentRepository.findById(
                                assignmentId
                        )
                        .orElseThrow(() ->
                                new AssignmentNotFoundException(
                                        "Assignment not found."
                                ));

        assignment.setReturnedDate(
                LocalDate.now()
        );

        Asset asset =
                assignment.getAsset();

        asset.setStatus(
                AssetStatus.AVAILABLE
        );

        assetRepository.save(
                asset
        );

        Assignment savedAssignment =
                assignmentRepository.save(
                        assignment
                );

        return assignmentMapper.toResponse(
                savedAssignment
        );
    }
}