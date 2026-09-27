package com.nextalx.specification;

import com.nextalx.entity.Asset;
import com.nextalx.enums.AssetStatus;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

import static com.nextalx.specification.SearchSpecifications.anyFieldContains;
import static com.nextalx.specification.SearchSpecifications.containsPattern;
import static com.nextalx.specification.SearchSpecifications.hasText;

public final class AssetSpecifications {

    private AssetSpecifications() {
    }

    /**
     * Every argument is optional; a null / blank value means "no filter".
     * {@code search} matches asset tag, name, brand, model, serial number
     * and supplier.
     */
    public static Specification<Asset> withFilters(
            String search,
            AssetStatus status,
            Long categoryId
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates =
                    new ArrayList<>();

            if (hasText(search)) {

                predicates.add(
                        anyFieldContains(
                                cb,
                                containsPattern(search),
                                root.get("assetTag"),
                                root.get("name"),
                                root.get("brand"),
                                root.get("model"),
                                root.get("serialNumber"),
                                root.get("supplier")
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

            if (categoryId != null) {

                predicates.add(
                        cb.equal(
                                root.get("category").get("id"),
                                categoryId
                        )
                );
            }

            return cb.and(
                    predicates.toArray(new Predicate[0])
            );
        };
    }
}
