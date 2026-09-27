package com.nextalx.service;

import com.nextalx.dto.request.CreateAssignmentRequest;
import com.nextalx.dto.response.AssignmentResponse;
import com.nextalx.enums.AssignmentStatus;
import org.springframework.data.domain.Page;

public interface AssignmentService {

    Page<AssignmentResponse> getAllAssignments(
            int page,
            int size,
            String search,
            AssignmentStatus status,
            Long employeeId,
            Long assetId
    );

    AssignmentResponse createAssignment(
            CreateAssignmentRequest request
    );

    AssignmentResponse returnAsset(
            Long assignmentId
    );
}