package com.nextalx.specification;

import com.nextalx.entity.Asset;
import com.nextalx.entity.Assignment;
import com.nextalx.entity.Employee;
import com.nextalx.enums.AssignmentStatus;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

import static com.nextalx.specification.SearchSpecifications.anyFieldContains;
import static com.nextalx.specification.SearchSpecifications.containsPattern;
import static com.nextalx.specification.SearchSpecifications.hasText;

public final class AssignmentSpecifications {

    private AssignmentSpecifications() {
    }

    /**
     * Every argument is optional; a null / blank value means "no filter".
     * {@code search} matches the employee's name and e-mail and the asset's
     * tag, name and serial number.
     */
    public static Specification<Assignment> withFilters(
            String search,
            AssignmentStatus status,
            Long employeeId,
            Long assetId
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates =
                    new ArrayList<>();

            if (hasText(search)) {

                Join<Assignment, Employee> employee =
                        root.join("employee");

                Join<Assignment, Asset> asset =
                        root.join("asset");

                Expression<String> employeeFullName =
                        cb.concat(
                                cb.concat(
                                        employee.<String>get("firstName"),
                                        " "
                                ),
                                employee.<String>get("lastName")
                        );

                predicates.add(
                        anyFieldContains(
                                cb,
                                containsPattern(search),
                                employeeFullName,
                                employee.get("email"),
                                asset.get("assetTag"),
                                asset.get("name"),
                                asset.get("serialNumber")
                        )
                );
            }

            if (status != null) {

                predicates.add(
                        cb.equal(
                                root.get("status"),
                                status
                        )
                );
            }

            if (employeeId != null) {

                predicates.add(
                        cb.equal(
                                root.get("employee").get("id"),
                                employeeId
                        )
                );
            }

            if (assetId != null) {

                predicates.add(
                        cb.equal(
                                root.get("asset").get("id"),
                                assetId
                        )
                );
            }

            return cb.and(
                    predicates.toArray(new Predicate[0])
            );
        };
    }
}
