package com.nextalx.mapper;

import com.nextalx.dto.request.CreateAssignmentRequest;
import com.nextalx.dto.response.AssignmentResponse;
import com.nextalx.entity.Asset;
import com.nextalx.entity.Assignment;
import com.nextalx.entity.Employee;
import com.nextalx.enums.AssignmentStatus;
import org.springframework.stereotype.Component;

@Component
public class AssignmentMapper {

    public Assignment toEntity(
            CreateAssignmentRequest request,
            Employee employee,
            Asset asset
    ) {

        Assignment assignment =
                new Assignment();

        assignment.setEmployee(
                employee
        );

        assignment.setAsset(
                asset
        );

        assignment.setAssignedDate(
                request.getAssignedDate()
        );

        assignment.setExpectedReturnDate(
                request.getExpectedReturnDate()
        );

        assignment.setNotes(
                request.getNote()
        );

        assignment.setStatus(
                AssignmentStatus.ACTIVE
        );

        return assignment;
    }

    public AssignmentResponse toResponse(
            Assignment assignment
    ) {

        return AssignmentResponse.builder()
                .id(
                        assignment.getId()
                )
                .employeeId(
                        assignment.getEmployee().getId()
                )
                .employeeName(
                        assignment.getEmployee().getFirstName()
                                + " "
                                + assignment.getEmployee().getLastName()
                )
                .assetId(
                        assignment.getAsset().getId()
                )
                .assetTag(
                        assignment.getAsset().getAssetTag()
                )
                .assignedDate(
                        assignment.getAssignedDate()
                )
                .expectedReturnDate(
                        assignment.getExpectedReturnDate()
                )
                .returnedDate(
                        assignment.getReturnedDate()
                )
                .note(
                        assignment.getNotes()
                )
                .status(
                        assignment.getStatus().name()
                )
                .build();
    }
}