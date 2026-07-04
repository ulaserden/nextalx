package com.nextalx.service;

import com.nextalx.dto.request.CreateAssignmentRequest;
import com.nextalx.dto.response.AssignmentResponse;
import org.springframework.data.domain.Page;

public interface AssignmentService {

    Page<AssignmentResponse> getAllAssignments(
            int page,
            int size
    );

    AssignmentResponse createAssignment(
            CreateAssignmentRequest request
    );

    AssignmentResponse returnAsset(
            Long assignmentId
    );
}