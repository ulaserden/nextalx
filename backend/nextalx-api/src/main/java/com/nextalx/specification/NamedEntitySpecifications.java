package com.nextalx.specification;

import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

import static com.nextalx.specification.SearchSpecifications.anyFieldContains;
import static com.nextalx.specification.SearchSpecifications.containsPattern;
import static com.nextalx.specification.SearchSpecifications.hasText;
import static com.nextalx.specification.SearchSpecifications.normalizeStatus;

/**
 * Filters for simple lookup entities that have {@code name},
 * {@code description} and a string {@code status} (departments, categories).
 */
public final class NamedEntitySpecifications {

    private NamedEntitySpecifications() {
    }

    /**
     * Every argument is optional; a null / blank value means "no filter".
     * {@code search} matches name and description.
     */
    public static <T> Specification<T> withFilters(
            String search,
            String status
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates =
                    new ArrayList<>();

            if (hasText(search)) {

                predicates.add(
                        anyFieldContains(
                                cb,
                                containsPattern(search),
                                root.get("name"),
                                root.get("description")
                        )
                );
            }

            if (hasText(status)) {

                predicates.add(
                        cb.equal(
                                root.get("status"),
                                normalizeStatus(status)
                        )
                );
            }

            return cb.and(
                    predicates.toArray(new Predicate[0])
            );
        };
    }
}
