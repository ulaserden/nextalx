package com.nextalx.controller;

import com.nextalx.dto.request.CreateAssignmentRequest;
import com.nextalx.dto.response.AssignmentResponse;
import com.nextalx.enums.AssignmentStatus;
import com.nextalx.service.AssignmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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
            int size,

            @RequestParam(
                    required = false
            )
            String search,

            @RequestParam(
                    required = false
            )
            AssignmentStatus status,

            @RequestParam(
                    required = false
            )
            Long employeeId,

            @RequestParam(
                    required = false
            )
            Long assetId
    ) {

        return assignmentService.getAllAssignments(
                page,
                size,
                search,
                status,
                employeeId,
                assetId
        );
    }

    @ResponseStatus(HttpStatus.CREATED)

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