package com.nextalx.specification;

import com.nextalx.entity.Employee;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

import static com.nextalx.specification.SearchSpecifications.anyFieldContains;
import static com.nextalx.specification.SearchSpecifications.containsPattern;
import static com.nextalx.specification.SearchSpecifications.hasText;
import static com.nextalx.specification.SearchSpecifications.normalizeStatus;

public final class EmployeeSpecifications {

    private EmployeeSpecifications() {
    }

    /**
     * Every argument is optional; a null / blank value means "no filter".
     * {@code search} matches first name, last name, full name, e-mail,
     * phone and job title.
     */
    public static Specification<Employee> withFilters(
            String search,
            String status,
            Long departmentId
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates =
                    new ArrayList<>();

            if (hasText(search)) {

                Expression<String> fullName =
                        cb.concat(
                                cb.concat(
                                        root.<String>get("firstName"),
                                        " "
                                ),
                                root.<String>get("lastName")
                        );

                predicates.add(
                        anyFieldContains(
                                cb,
                                containsPattern(search),
                                fullName,
                                root.get("email"),
                                root.get("phone"),
                                root.get("jobTitle")
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

            if (departmentId != null) {

                predicates.add(
                        cb.equal(
                                root.get("department").get("id"),
                                departmentId
                        )
                );
            }

            return cb.and(
                    predicates.toArray(new Predicate[0])
            );
        };
    }
}
