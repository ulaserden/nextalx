package com.nextalx.service.impl;

import com.nextalx.dto.request.CreateCategoryRequest;
import com.nextalx.dto.request.UpdateCategoryRequest;
import com.nextalx.dto.response.CategoryResponse;
import com.nextalx.entity.Category;
import com.nextalx.exception.CategoryAlreadyExistsException;
import com.nextalx.exception.CategoryNotFoundException;
import com.nextalx.mapper.CategoryMapper;
import com.nextalx.repository.CategoryRepository;
import com.nextalx.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl
        implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public Page<CategoryResponse> getAllCategories(
            int page,
            int size
    ) {

        return categoryRepository.findAll(
                        PageRequest.of(
                                page,
                                size
                        )
                )
                .map(
                        categoryMapper::toResponse
                );
    }

    @Override
    public CategoryResponse createCategory(
            CreateCategoryRequest request
    ) {

        if (
                categoryRepository.existsByName(
                        request.getName()
                )
        ) {

            throw new CategoryAlreadyExistsException(
                    "Category already exists."
            );
        }

        Category category =
                categoryMapper.toEntity(
                        request
                );

        return categoryMapper.toResponse(
                categoryRepository.save(
                        category
                )
        );
    }

    @Override
    public CategoryResponse updateCategory(
            Long id,
            UpdateCategoryRequest request
    ) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new CategoryNotFoundException(
                                        "Category not found."
                                ));

        if (
                categoryRepository.existsByNameAndIdNot(
                        request.getName(),
                        id
                )
        ) {

            throw new CategoryAlreadyExistsException(
                    "Category already exists."
            );
        }

        category.setName(
                request.getName()
        );

        category.setDescription(
                request.getDescription()
        );

        return categoryMapper.toResponse(
                categoryRepository.save(
                        category
                )
        );
    }

    @Override
    public CategoryResponse activateCategory(
            Long id
    ) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new CategoryNotFoundException(
                                        "Category not found."
                                ));

        category.setStatus(
                "ACTIVE"
        );

        return categoryMapper.toResponse(
                categoryRepository.save(
                        category
                )
        );
    }

    @Override
    public CategoryResponse deactivateCategory(
            Long id
    ) {

        Category category =
                categoryRepository.findById(id)
                        .orElseThrow(() ->
                                new CategoryNotFoundException(
                                        "Category not found."
                                ));

        category.setStatus(
                "INACTIVE"
        );

        return categoryMapper.toResponse(
                categoryRepository.save(
                        category
                )
        );
    }
}