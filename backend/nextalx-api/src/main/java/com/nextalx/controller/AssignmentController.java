package com.nextalx.controller;

import com.nextalx.dto.request.CreateAssignmentRequest;
import com.nextalx.dto.response.AssignmentResponse;
import com.nextalx.service.AssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;

    @GetMapping
    public Page<AssignmentResponse> getAllAssignments(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size
    ) {

        return assignmentService.getAllAssignments(
                page,
                size
        );
    }

    @PostMapping
    public AssignmentResponse createAssignment(
            @Valid
            @RequestBody
            CreateAssignmentRequest request
    ) {

        return assignmentService.createAssignment(
                request
        );
    }

    @PutMapping("/{id}/return")
    public AssignmentResponse returnAsset(
            @PathVariable Long id
    ) {

        return assignmentService.returnAsset(
                id
        );
    }
}