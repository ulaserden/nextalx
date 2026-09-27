package com.nextalx.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nextalx.entity.Asset;
import com.nextalx.entity.Category;
import com.nextalx.enums.AssetStatus;
import com.nextalx.repository.AssetRepository;
import com.nextalx.repository.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Warranty state, filter and dashboard numbers against the real database.
 * Fixture dates are relative to today (default 90-day window); every
 * fixture asset tag starts with "WQZ" so the V7 demo data does not interfere.
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class WarrantyIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AssetRepository assetRepository;

    private void createFixtures() {

        LocalDate today = LocalDate.now();

        Category category = new Category();
        category.setName("Wqz Category");
        category = categoryRepository.save(category);

        asset("WQZ-EXPIRED", today.minusDays(10), AssetStatus.ASSIGNED, category);
        asset("WQZ-TODAY", today, AssetStatus.AVAILABLE, category);
        asset("WQZ-SOON", today.plusDays(10), AssetStatus.IN_REPAIR, category);
        asset("WQZ-EDGE", today.plusDays(90), AssetStatus.AVAILABLE, category);
        asset("WQZ-VALID", today.plusDays(91), AssetStatus.AVAILABLE, category);
        asset("WQZ-NODATE", null, AssetStatus.AVAILABLE, category);
        asset("WQZ-RETIRED", today.minusDays(10), AssetStatus.RETIRED, category);
        asset("WQZ-LOST", today.plusDays(5), AssetStatus.LOST, category);
    }

    @Test
    void assetResponse_reportsWarrantyStatusAndDaysRemaining() throws Exception {

        createFixtures();

        JsonNode page = getJson("/api/v1/assets?search=wqz-&size=50");

        assertThat(field(page, "WQZ-EXPIRED", "warrantyStatus")).isEqualTo("EXPIRED");
        assertThat(field(page, "WQZ-EXPIRED", "warrantyDaysRemaining")).isEqualTo("-10");
        assertThat(field(page, "WQZ-TODAY", "warrantyStatus")).isEqualTo("EXPIRING");
        assertThat(field(page, "WQZ-TODAY", "warrantyDaysRemaining")).isEqualTo("0");
        assertThat(field(page, "WQZ-EDGE", "warrantyStatus")).isEqualTo("EXPIRING");
        assertThat(field(page, "WQZ-VALID", "warrantyStatus")).isEqualTo("VALID");
        assertThat(field(page, "WQZ-VALID", "warrantyDaysRemaining")).isEqualTo("91");

        // No warranty date, or out of service: no warranty state at all.
        assertThat(field(page, "WQZ-NODATE", "warrantyStatus")).isEqualTo("null");
        assertThat(field(page, "WQZ-RETIRED", "warrantyStatus")).isEqualTo("null");
        assertThat(field(page, "WQZ-LOST", "warrantyDaysRemaining")).isEqualTo("null");
    }

    @Test
    void assetList_filtersByWarrantyStatus() throws Exception {

        createFixtures();

        mockMvc.perform(get("/api/v1/assets")
                        .param("search", "wqz-")
                        .param("warranty", "EXPIRED"))
                .andExpect(jsonPath("$.content[*].assetTag")
                        .value(containsInAnyOrder("WQZ-EXPIRED")));

        mockMvc.perform(get("/api/v1/assets")
                        .param("search", "wqz-")
                        .param("warranty", "EXPIRING"))
                .andExpect(jsonPath("$.content[*].assetTag")
                        .value(containsInAnyOrder("WQZ-TODAY", "WQZ-SOON", "WQZ-EDGE")));

        mockMvc.perform(get("/api/v1/assets")
                        .param("search", "wqz-")
                        .param("warranty", "EXPIRING")
                        .param("status", "AVAILABLE"))
                .andExpect(jsonPath("$.content[*].assetTag")
                        .value(containsInAnyOrder("WQZ-TODAY", "WQZ-EDGE")));

        mockMvc.perform(get("/api/v1/assets").param("warranty", "SOMEDAY"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void dashboard_countsMatchTheAssetFilter() throws Exception {

        JsonNode before = getJson("/api/v1/dashboard/stats");

        createFixtures();

        JsonNode after = getJson("/api/v1/dashboard/stats");

        assertThat(after.get("warrantyExpiringWithinDays").asInt()).isEqualTo(90);

        assertThat(after.get("warrantyExpiringAssets").asLong()
                - before.get("warrantyExpiringAssets").asLong())
                .isEqualTo(3);

        assertThat(after.get("warrantyExpiredAssets").asLong()
                - before.get("warrantyExpiredAssets").asLong())
                .isEqualTo(1);

        assertThat(after.get("warrantyExpiringAssets").asLong())
                .isEqualTo(getJson("/api/v1/assets?warranty=EXPIRING")
                        .get("totalElements").asLong());

        assertThat(after.get("warrantyExpiredAssets").asLong())
                .isEqualTo(getJson("/api/v1/assets?warranty=EXPIRED")
                        .get("totalElements").asLong());
    }

    @Test
    void expiringWarranties_areSoonestFirstAndLimited() throws Exception {

        createFixtures();

        JsonNode all = getJson("/api/v1/dashboard/expiring-warranties?limit=50");

        List<String> tags = new ArrayList<>();
        LocalDate previous = LocalDate.MIN;

        for (JsonNode asset : all) {

            assertThat(asset.get("warrantyStatus").asText()).isEqualTo("EXPIRING");

            LocalDate end = LocalDate.parse(asset.get("warrantyEndDate").asText());
            assertThat(end).isAfterOrEqualTo(previous);
            previous = end;

            tags.add(asset.get("assetTag").asText());
        }

        assertThat(tags).containsSubsequence("WQZ-TODAY", "WQZ-SOON", "WQZ-EDGE");
        assertThat(tags).doesNotContain("WQZ-VALID", "WQZ-LOST");

        assertThat(getJson("/api/v1/dashboard/expiring-warranties?limit=2")).hasSize(2);

        // Out-of-range limits are clamped instead of failing.
        assertThat(getJson("/api/v1/dashboard/expiring-warranties?limit=0")).hasSize(1);
    }

    private JsonNode getJson(String url) throws Exception {

        String body = mockMvc.perform(get(url))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        return objectMapper.readTree(body);
    }

    private static String field(JsonNode page, String assetTag, String field) {

        for (JsonNode asset : page.get("content")) {

            if (assetTag.equals(asset.get("assetTag").asText())) {
                return asset.get(field).asText();
            }
        }

        throw new AssertionError("Asset not in response: " + assetTag);
    }

    private void asset(
            String assetTag,
            LocalDate warrantyEndDate,
            AssetStatus status,
            Category category
    ) {

        Asset asset = new Asset();
        asset.setAssetTag(assetTag);
        asset.setName("Wqz " + assetTag);
        asset.setSerialNumber("SN-" + assetTag);
        asset.setWarrantyEndDate(warrantyEndDate);
        asset.setStatus(status);
        asset.setCategory(category);
        assetRepository.save(asset);
    }
}
