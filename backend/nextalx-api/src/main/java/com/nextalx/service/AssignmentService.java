package com.nextalx.service;

import com.nextalx.dto.request.CreateAssignmentRequest;
import com.nextalx.dto.response.AssignmentResponse;

import java.util.List;

public interface AssignmentService {

    List<AssignmentResponse> getAllAssignments();

    AssignmentResponse createAssignment(
            CreateAssignmentRequest request
    );
}