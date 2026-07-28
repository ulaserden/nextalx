package com.nextalx.service.impl;

import com.nextalx.dto.request.CreateAssignmentRequest;
import com.nextalx.entity.Asset;
import com.nextalx.entity.Assignment;
import com.nextalx.entity.Employee;
import com.nextalx.enums.AssetStatus;
import com.nextalx.enums.AssignmentStatus;
import com.nextalx.exception.AssetAlreadyAssignedException;
import com.nextalx.mapper.AssignmentMapper;
import com.nextalx.repository.AssetRepository;
import com.nextalx.repository.AssignmentRepository;
import com.nextalx.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AssignmentServiceImplTest {

    @Mock
    private AssignmentRepository assignmentRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private AssetRepository assetRepository;

    @Mock
    private AssignmentMapper assignmentMapper;

    @InjectMocks
    private AssignmentServiceImpl assignmentService;

    private CreateAssignmentRequest request() {
        CreateAssignmentRequest request = new CreateAssignmentRequest();
        request.setEmployeeId(1L);
        request.setAssetId(2L);
        request.setAssignedDate(LocalDate.now());
        return request;
    }

    private Employee employee(String status) {
        Employee employee = new Employee();
        employee.setStatus(status);
        return employee;
    }

    private Asset asset(AssetStatus status) {
        Asset asset = new Asset();
        asset.setStatus(status);
        return asset;
    }

    @Test
    void createAssignment_marksAssetAssigned_whenAvailable() {
        when(employeeRepository.findById(1L))
                .thenReturn(Optional.of(employee("ACTIVE")));
        Asset asset = asset(AssetStatus.AVAILABLE);
        when(assetRepository.findById(2L))
                .thenReturn(Optional.of(asset));
        when(assignmentRepository.existsByAssetIdAndReturnedDateIsNull(any()))
                .thenReturn(false);
        Assignment assignment = new Assignment();
        assignment.setAsset(asset);
        when(assignmentMapper.toEntity(any(), any(), any()))
                .thenReturn(assignment);
        when(assignmentRepository.save(any()))
                .thenReturn(assignment);

        assignmentService.createAssignment(request());

        assertThat(asset.getStatus()).isEqualTo(AssetStatus.ASSIGNED);
        assertThat(assignment.getStatus()).isEqualTo(AssignmentStatus.ACTIVE);
    }

    @Test
    void createAssignment_rejects_whenAssetHasActiveAssignment() {
        when(employeeRepository.findById(1L))
                .thenReturn(Optional.of(employee("ACTIVE")));
        when(assetRepository.findById(2L))
                .thenReturn(Optional.of(asset(AssetStatus.ASSIGNED)));
        when(assignmentRepository.existsByAssetIdAndReturnedDateIsNull(any()))
                .thenReturn(true);

        assertThatThrownBy(() ->
                assignmentService.createAssignment(request()))
                .isInstanceOf(AssetAlreadyAssignedException.class);
    }

    @Test
    void createAssignment_rejects_whenAssetNotAvailable() {
        when(employeeRepository.findById(1L))
                .thenReturn(Optional.of(employee("ACTIVE")));
        when(assetRepository.findById(2L))
                .thenReturn(Optional.of(asset(AssetStatus.IN_REPAIR)));
        when(assignmentRepository.existsByAssetIdAndReturnedDateIsNull(any()))
                .thenReturn(false);

        assertThatThrownBy(() ->
                assignmentService.createAssignment(request()))
                .isInstanceOf(AssetAlreadyAssignedException.class);
    }

    @Test
    void createAssignment_rejects_whenEmployeeInactive() {
        when(employeeRepository.findById(1L))
                .thenReturn(Optional.of(employee("INACTIVE")));

        assertThatThrownBy(() ->
                assignmentService.createAssignment(request()))
                .isInstanceOf(IllegalStateException.class);
    }

    @Test
    void returnAsset_rejects_whenAlreadyReturned() {
        Assignment assignment = new Assignment();
        assignment.setReturnedDate(LocalDate.now());
        when(assignmentRepository.findById(9L))
                .thenReturn(Optional.of(assignment));

        assertThatThrownBy(() ->
                assignmentService.returnAsset(9L))
                .isInstanceOf(IllegalStateException.class);
    }

    @Test
    void returnAsset_marksAssetAvailable_andReturned() {
        Asset asset = asset(AssetStatus.ASSIGNED);
        Assignment assignment = new Assignment();
        assignment.setAsset(asset);
        assignment.setStatus(AssignmentStatus.ACTIVE);
        when(assignmentRepository.findById(9L))
                .thenReturn(Optional.of(assignment));
        when(assignmentRepository.save(any()))
                .thenReturn(assignment);

        assignmentService.returnAsset(9L);

        assertThat(asset.getStatus()).isEqualTo(AssetStatus.AVAILABLE);
        assertThat(assignment.getStatus()).isEqualTo(AssignmentStatus.RETURNED);
        assertThat(assignment.getReturnedDate()).isNotNull();
    }
}
