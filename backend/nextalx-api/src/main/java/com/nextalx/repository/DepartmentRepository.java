package com.nextalx.repository;

import com.nextalx.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface DepartmentRepository
        extends JpaRepository<Department, Long>,
        JpaSpecificationExecutor<Department> {

    Optional<Department> findByName(
            String name
    );

    boolean existsByName(
            String name
    );

    boolean existsByNameAndIdNot(
            String name,
            Long id
    );
}