package com.nextalx.repository;

import com.nextalx.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository
        extends JpaRepository<Assignment, Long> {

    boolean existsByAssetIdAndReturnedDateIsNull(
            Long assetId
    );
}