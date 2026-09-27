package com.nextalx.repository;

import com.nextalx.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CategoryRepository
        extends JpaRepository<Category, Long>,
        JpaSpecificationExecutor<Category> {

    boolean existsByName(
            String name
    );

    boolean existsByNameAndIdNot(
            String name,
            Long id
    );
}