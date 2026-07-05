package com.nextalx.service;

import com.nextalx.dto.request.CreateCategoryRequest;
import com.nextalx.dto.request.UpdateCategoryRequest;
import com.nextalx.dto.response.CategoryResponse;
import org.springframework.data.domain.Page;

public interface CategoryService {

    Page<CategoryResponse> getAllCategories(
            int page,
            int size
    );

    CategoryResponse createCategory(
            CreateCategoryRequest request
    );

    CategoryResponse updateCategory(
            Long id,
            UpdateCategoryRequest request
    );

    CategoryResponse activateCategory(
            Long id
    );

    CategoryResponse deactivateCategory(
            Long id
    );
}