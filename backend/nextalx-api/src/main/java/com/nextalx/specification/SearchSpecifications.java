package com.nextalx.specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;

import java.util.Locale;

/**
 * Shared helpers for building case-insensitive "contains" search predicates.
 */
final class SearchSpecifications {

    private static final char ESCAPE_CHAR = '\\';

    // Turkish dotted / dotless I variants, all folded to a plain "i" before
    // lowering. lower() alone maps "İ" to "i" + combining dot and "I" to "i",
    // so "ŞAHİN" would miss "Şahin" and "YILDIRIM" would miss "Yıldırım".
    private static final String I_VARIANTS = "İIı";

    private static final String I_FOLDED = "iii";

    private SearchSpecifications() {
    }

    static boolean hasText(
            String value
    ) {

        return value != null
                && !value.isBlank();
    }

    /**
     * Builds a {@code %term%} LIKE pattern, escaping the LIKE wildcards so a
     * user typing "%" or "_" searches for the literal character.
     */
    static String containsPattern(
            String search
    ) {

        String escaped = search.trim()
                .replace("\\", "\\\\")
                .replace("%", "\\%")
                .replace("_", "\\_");

        return "%" + escaped + "%";
    }

    /**
     * OR-combines a case-insensitive LIKE over every given field. Both sides
     * are folded by the database so non-ASCII letters (ş, ğ, ü, ...) fold
     * the same way as the stored data.
     */
    @SafeVarargs
    static Predicate anyFieldContains(
            CriteriaBuilder cb,
            String pattern,
            Expression<String>... fields
    ) {

        Expression<String> foldedPattern =
                fold(cb, cb.literal(pattern));

        Predicate[] predicates =
                new Predicate[fields.length];

        for (int i = 0; i < fields.length; i++) {

            predicates[i] = cb.like(
                    fold(cb, fields[i]),
                    foldedPattern,
                    ESCAPE_CHAR
            );
        }

        return cb.or(predicates);
    }

    private static Expression<String> fold(
            CriteriaBuilder cb,
            Expression<String> value
    ) {

        return cb.lower(
                cb.function(
                        "translate",
                        String.class,
                        value,
                        cb.literal(I_VARIANTS),
                        cb.literal(I_FOLDED)
                )
        );
    }

    static String normalizeStatus(
            String status
    ) {

        return status.trim()
                .toUpperCase(Locale.ROOT);
    }
}
