package com.nextalx.service;

import com.nextalx.entity.Asset;
import com.nextalx.enums.AssetStatus;
import com.nextalx.enums.WarrantyStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.EnumSet;
import java.util.Set;

/**
 * Single definition of an asset's warranty state, shared by the asset list
 * filter, the asset response and the dashboard so their numbers always agree.
 *
 * <ul>
 *   <li>{@code EXPIRED}  – warranty end date is before today.</li>
 *   <li>{@code EXPIRING} – ends today or within the next
 *       {@code app.warranty.expiring-within-days} days (default 90).</li>
 *   <li>{@code VALID}    – ends later than that.</li>
 * </ul>
 *
 * Assets without a warranty end date, and assets that are out of service
 * (RETIRED, LOST), have no warranty state: nobody needs a reminder for them.
 */
@Component
public class WarrantyPolicy {

    private static final Set<AssetStatus> OUT_OF_SERVICE =
            EnumSet.of(
                    AssetStatus.RETIRED,
                    AssetStatus.LOST
            );

    private final int expiringWithinDays;

    public WarrantyPolicy(
            @Value("${app.warranty.expiring-within-days:90}")
            int expiringWithinDays
    ) {

        this.expiringWithinDays = expiringWithinDays;
    }

    public int getExpiringWithinDays() {

        return expiringWithinDays;
    }

    public LocalDate today() {

        return LocalDate.now();
    }

    public WarrantyStatus statusOf(
            Asset asset
    ) {

        if (!isTracked(asset)) {
            return null;
        }

        LocalDate end = asset.getWarrantyEndDate();
        LocalDate today = today();

        if (end.isBefore(today)) {
            return WarrantyStatus.EXPIRED;
        }

        if (!end.isAfter(expiringHorizon(today))) {
            return WarrantyStatus.EXPIRING;
        }

        return WarrantyStatus.VALID;
    }

    /**
     * Days from today until the warranty ends; negative once it has expired.
     */
    public Long daysRemaining(
            Asset asset
    ) {

        if (!isTracked(asset)) {
            return null;
        }

        return ChronoUnit.DAYS.between(
                today(),
                asset.getWarrantyEndDate()
        );
    }

    /**
     * Assets currently in the given warranty state. A null state matches
     * every asset (no filter).
     */
    public Specification<Asset> matching(
            WarrantyStatus status
    ) {

        if (status == null) {
            return (root, query, cb) -> cb.conjunction();
        }

        return (root, query, cb) -> {

            LocalDate today = today();

            var end = root.<LocalDate>get("warrantyEndDate");

            var tracked = cb.and(
                    cb.isNotNull(end),
                    root.get("status").in(OUT_OF_SERVICE).not()
            );

            var inState = switch (status) {
                case EXPIRED -> cb.lessThan(end, today);
                case EXPIRING -> cb.between(end, today, expiringHorizon(today));
                case VALID -> cb.greaterThan(end, expiringHorizon(today));
            };

            return cb.and(tracked, inState);
        };
    }

    private boolean isTracked(
            Asset asset
    ) {

        return asset.getWarrantyEndDate() != null
                && !OUT_OF_SERVICE.contains(asset.getStatus());
    }

    private LocalDate expiringHorizon(
            LocalDate today
    ) {

        return today.plusDays(expiringWithinDays);
    }
}
