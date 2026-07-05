package com.nextalx.mapper;

import com.nextalx.dto.request.CreateCategoryRequest;
import com.nextalx.dto.response.CategoryResponse;
import com.nextalx.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public Category toEntity(
            CreateCategoryRequest request
    ) {

        Category category =
                new Category();

        category.setName(
                request.getName()
        );

        category.setDescription(
                request.getDescription()
        );

        category.setStatus(
                "ACTIVE"
        );

        return category;
    }

    public CategoryResponse toResponse(
            Category category
    ) {

        return CategoryResponse.builder()
                .id(
                        category.getId()
                )
                .name(
                        category.getName()
                )
                .description(
                        category.getDescription()
                )
                .status(
                        category.getStatus()
                )
                .build();
    }
}