package com.nextalx.entity;

import com.nextalx.enums.AssignmentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "assignments")
public class Assignment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "employee_id",
            nullable = false
    )
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "asset_id",
            nullable = false
    )
    private Asset asset;

    @Column(
            name = "assigned_date",
            nullable = false
    )
    private LocalDate assignedDate;

    @Column(
            name = "expected_return_date"
    )
    private LocalDate expectedReturnDate;

    @Column(
            name = "returned_date"
    )
    private LocalDate returnedDate;

    @Column(
            name = "notes",
            length = 500
    )
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "status",
            nullable = false
    )
    private AssignmentStatus status =
            AssignmentStatus.ACTIVE;
}