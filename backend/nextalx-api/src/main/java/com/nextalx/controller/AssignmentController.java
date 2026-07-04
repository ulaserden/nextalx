package com.nextalx.controller;

import com.nextalx.dto.request.CreateAssignmentRequest;
import com.nextalx.dto.response.AssignmentResponse;
import com.nextalx.service.AssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    @GetMapping
    public List<AssignmentResponse> getAllAssignments() {
        return assignmentService.getAllAssignments();
    }

    @PostMapping
    public AssignmentResponse createAssignment(
            @Valid @RequestBody
            CreateAssignmentRequest request
    ) {
        return assignmentService.createAssignment(
                request
        );
    }
}