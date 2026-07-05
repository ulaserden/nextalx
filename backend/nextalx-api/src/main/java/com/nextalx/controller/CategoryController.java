package com.nextalx.controller;

import com.nextalx.dto.request.CreateCategoryRequest;
import com.nextalx.dto.request.UpdateCategoryRequest;
import com.nextalx.dto.response.CategoryResponse;
import com.nextalx.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public Page<CategoryResponse> getAllCategories(
            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "10")
            int size
    ) {

        return categoryService.getAllCategories(
                page,
                size
        );
    }

    @PostMapping
    public CategoryResponse createCategory(
            @Valid
            @RequestBody
            CreateCategoryRequest request
    ) {

        return categoryService.createCategory(
                request
        );
    }

    @PutMapping("/{id}")
    public CategoryResponse updateCategory(
            @PathVariable Long id,
            @Valid
            @RequestBody
            UpdateCategoryRequest request
    ) {

        return categoryService.updateCategory(
                id,
                request
        );
    }

    @PatchMapping("/{id}/activate")
    public CategoryResponse activateCategory(
            @PathVariable Long id
    ) {

        return categoryService.activateCategory(
                id
        );
    }

    @PatchMapping("/{id}/deactivate")
    public CategoryResponse deactivateCategory(
            @PathVariable Long id
    ) {

        return categoryService.deactivateCategory(
                id
        );
    }
}