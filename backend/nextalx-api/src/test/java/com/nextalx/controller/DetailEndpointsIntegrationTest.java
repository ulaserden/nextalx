package com.nextalx.controller;

import com.nextalx.entity.Asset;
import com.nextalx.entity.Assignment;
import com.nextalx.entity.Category;
import com.nextalx.entity.Department;
import com.nextalx.entity.Employee;
import com.nextalx.enums.AssetStatus;
import com.nextalx.enums.AssignmentStatus;
import com.nextalx.repository.AssetRepository;
import com.nextalx.repository.AssignmentRepository;
import com.nextalx.repository.CategoryRepository;
import com.nextalx.repository.DepartmentRepository;
import com.nextalx.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.hamcrest.Matchers.contains;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Endpoints backing the asset and employee detail pages: fetch by id and the
 * per-asset / per-employee assignment history (newest first).
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class DetailEndpointsIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Test
    void getAssetAndEmployeeById() throws Exception {

        Employee employee = employee("dqz.one@example.com");
        Asset asset = asset("DQZ-001");

        mockMvc.perform(get("/api/v1/assets/{id}", asset.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.assetTag").value("DQZ-001"))
                .andExpect(jsonPath("$.categoryName").value("Dqz Category"));

        mockMvc.perform(get("/api/v1/employees/{id}", employee.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("dqz.one@example.com"))
                .andExpect(jsonPath("$.departmentName").value("Dqz Department"));
    }

    @Test
    void unknownIdsAreNotFound() throws Exception {

        mockMvc.perform(get("/api/v1/assets/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Asset not found."));

        mockMvc.perform(get("/api/v1/employees/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Employee not found."));

        mockMvc.perform(get("/api/v1/assets/not-a-number"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void assignmentHistoryIsNewestFirstAndIncludesAssetName() throws Exception {

        Employee first = employee("dqz.first@example.com");
        Employee second = employee("dqz.second@example.com");
        Asset asset = asset("DQZ-002");

        LocalDate today = LocalDate.now();

        assignment(first, asset, today.minusDays(60), today.minusDays(30));
        assignment(second, asset, today.minusDays(10), null);

        mockMvc.perform(get("/api/v1/assignments")
                        .param("assetId", asset.getId().toString()))
                .andExpect(jsonPath("$.totalElements").value(2))
                .andExpect(jsonPath("$.content[*].employeeId")
                        .value(contains(
                                second.getId().intValue(),
                                first.getId().intValue()
                        )))
                .andExpect(jsonPath("$.content[0].assetName").value("Dqz DQZ-002"))
                .andExpect(jsonPath("$.content[0].status").value("ACTIVE"));

        mockMvc.perform(get("/api/v1/assignments")
                        .param("employeeId", first.getId().toString()))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].status").value("RETURNED"));
    }

    private Department department;

    private Category category;

    private Employee employee(String email) {

        if (department == null) {
            department = new Department();
            department.setName("Dqz Department");
            department = departmentRepository.save(department);
        }

        Employee employee = new Employee();
        employee.setFirstName("Dqz");
        employee.setLastName(email);
        employee.setEmail(email);
        employee.setStatus("ACTIVE");
        employee.setDepartment(department);
        return employeeRepository.save(employee);
    }

    private Asset asset(String assetTag) {

        if (category == null) {
            category = new Category();
            category.setName("Dqz Category");
            category = categoryRepository.save(category);
        }

        Asset asset = new Asset();
        asset.setAssetTag(assetTag);
        asset.setName("Dqz " + assetTag);
        asset.setSerialNumber("SN-" + assetTag);
        asset.setStatus(AssetStatus.AVAILABLE);
        asset.setCategory(category);
        return assetRepository.save(asset);
    }

    private void assignment(
            Employee employee,
            Asset asset,
            LocalDate assignedDate,
            LocalDate returnedDate
    ) {

        Assignment assignment = new Assignment();
        assignment.setEmployee(employee);
        assignment.setAsset(asset);
        assignment.setAssignedDate(assignedDate);
        assignment.setReturnedDate(returnedDate);
        assignment.setStatus(
                returnedDate == null
                        ? AssignmentStatus.ACTIVE
                        : AssignmentStatus.RETURNED
        );
        assignmentRepository.save(assignment);
    }
}
