package com.nextalx.repository;

import com.nextalx.entity.Assignment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface AssignmentRepository
        extends JpaRepository<Assignment, Long>,
        JpaSpecificationExecutor<Assignment> {

    boolean existsByAssetIdAndReturnedDateIsNull(
            Long assetId
    );

    @Override
    @EntityGraph(
            attributePaths = {
                    "employee",
                    "asset"
            }
    )
    Page<Assignment> findAll(
            Specification<Assignment> spec,
            Pageable pageable
    );

    @Override
    @EntityGraph(
            attributePaths = {
                    "employee",
                    "asset"
            }
    )
    Optional<Assignment> findById(
            Long id
    );
}