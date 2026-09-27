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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Exercises the search / filter query parameters of the list endpoints against
 * the real database. Every fixture row carries the marker "qzx" so the
 * assertions are unaffected by the V7 demo data; each test rolls back.
 */
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class ListFilterIntegrationTest {

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

    private Category laptops;

    private Employee alice;

    private Asset thinkpad;

    @BeforeEach
    void setUp() {

        Department engineering = department("Qzx Engineering", "ACTIVE");
        Department archive = department("Qzx Archive", "INACTIVE");

        alice = employee("Alice", "Qzxson", "alice.qzx@example.com", engineering, "ACTIVE");
        employee("Bob", "Qzxman", "bob.qzx@example.com", archive, "INACTIVE");

        laptops = category("Qzx Laptops");
        Category monitors = category("Qzx Monitors");

        thinkpad = asset("QZX-001", "Qzx ThinkPad", "Lenovo", "SN-QZX-1", laptops, AssetStatus.ASSIGNED);
        asset("QZX-002", "Qzx MacBook", "Apple", "SN-QZX-2", laptops, AssetStatus.AVAILABLE);
        asset("QZX-003", "Qzx UltraSharp", "Dell", "SN-QZX-3", monitors, AssetStatus.IN_REPAIR);

        Assignment active = new Assignment();
        active.setEmployee(alice);
        active.setAsset(thinkpad);
        active.setAssignedDate(LocalDate.now());
        active.setStatus(AssignmentStatus.ACTIVE);
        assignmentRepository.save(active);
    }

    @Test
    void assets_searchIsCaseInsensitiveAcrossFields() throws Exception {

        mockMvc.perform(get("/api/v1/assets").param("search", "QZX THINKPAD"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].assetTag").value("QZX-001"));

        mockMvc.perform(get("/api/v1/assets").param("search", "sn-qzx").param("size", "50"))
                .andExpect(jsonPath("$.content[*].assetTag")
                        .value(contains("QZX-001", "QZX-002", "QZX-003")));
    }

    @Test
    void assets_filtersCombineWithSearch() throws Exception {

        mockMvc.perform(get("/api/v1/assets")
                        .param("search", "qzx")
                        .param("categoryId", laptops.getId().toString()))
                .andExpect(jsonPath("$.content[*].assetTag")
                        .value(containsInAnyOrder("QZX-001", "QZX-002")));

        mockMvc.perform(get("/api/v1/assets")
                        .param("search", "qzx")
                        .param("categoryId", laptops.getId().toString())
                        .param("status", "AVAILABLE"))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].assetTag").value("QZX-002"));
    }

    @Test
    void assets_likeWildcardsAreMatchedLiterally() throws Exception {

        mockMvc.perform(get("/api/v1/assets").param("search", "qzx%"))
                .andExpect(jsonPath("$.totalElements").value(0));

        mockMvc.perform(get("/api/v1/assets").param("search", "qzx_00"))
                .andExpect(jsonPath("$.totalElements").value(0));
    }

    @Test
    void assets_invalidStatusIsBadRequest() throws Exception {

        mockMvc.perform(get("/api/v1/assets").param("status", "NOPE"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void assets_paginationReportsFilteredTotal() throws Exception {

        mockMvc.perform(get("/api/v1/assets")
                        .param("search", "qzx")
                        .param("page", "1")
                        .param("size", "2"))
                .andExpect(jsonPath("$.totalElements").value(3))
                .andExpect(jsonPath("$.content[*].assetTag").value(contains("QZX-003")));
    }

    @Test
    void employees_searchMatchesFullNameAndFiltersByStatusAndDepartment() throws Exception {

        mockMvc.perform(get("/api/v1/employees").param("search", "alice qzxson"))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].email").value("alice.qzx@example.com"));

        mockMvc.perform(get("/api/v1/employees")
                        .param("search", "qzx")
                        .param("status", "inactive"))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].email").value("bob.qzx@example.com"));

        mockMvc.perform(get("/api/v1/employees")
                        .param("departmentId", alice.getDepartment().getId().toString()))
                .andExpect(jsonPath("$.content[*].email").value(contains("alice.qzx@example.com")));
    }

    @Test
    void employees_searchFoldsTurkishCharacters() throws Exception {

        employee("Şeyma", "Qzxoğlu", "seyma.qzx@example.com", alice.getDepartment(), "ACTIVE");

        mockMvc.perform(get("/api/v1/employees").param("search", "ŞEYMA QZXOĞLU"))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].email").value("seyma.qzx@example.com"));

        employee("Işıl", "Qzxİnce", "isil.qzx@example.com", alice.getDepartment(), "ACTIVE");

        // Dotted / dotless I in either direction.
        for (String term : new String[]{"IŞIL QZXINCE", "işil qzxince", "ışıl QZXİNCE"}) {

            mockMvc.perform(get("/api/v1/employees").param("search", term))
                    .andExpect(jsonPath("$.totalElements").value(1))
                    .andExpect(jsonPath("$.content[0].email").value("isil.qzx@example.com"));
        }
    }

    @Test
    void departmentsAndCategories_filterByNameAndStatus() throws Exception {

        mockMvc.perform(get("/api/v1/departments")
                        .param("search", "qzx")
                        .param("status", "ACTIVE"))
                .andExpect(jsonPath("$.content[*].name").value(contains("Qzx Engineering")));

        mockMvc.perform(get("/api/v1/categories").param("search", "QZX MON"))
                .andExpect(jsonPath("$.content[*].name").value(contains("Qzx Monitors")));
    }

    @Test
    void assignments_searchByEmployeeOrAssetAndFilterByStatus() throws Exception {

        mockMvc.perform(get("/api/v1/assignments").param("search", "qzx thinkpad"))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].employeeName").value("Alice Qzxson"));

        mockMvc.perform(get("/api/v1/assignments").param("search", "alice qzx"))
                .andExpect(jsonPath("$.content[*].assetTag").value(contains("QZX-001")));

        mockMvc.perform(get("/api/v1/assignments")
                        .param("assetId", thinkpad.getId().toString())
                        .param("status", "RETURNED"))
                .andExpect(jsonPath("$.totalElements").value(0));
    }

    private Department department(String name, String status) {

        Department department = new Department();
        department.setName(name);
        department.setStatus(status);
        return departmentRepository.save(department);
    }

    private Employee employee(
            String firstName,
            String lastName,
            String email,
            Department department,
            String status
    ) {

        Employee employee = new Employee();
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setEmail(email);
        employee.setDepartment(department);
        employee.setStatus(status);
        return employeeRepository.save(employee);
    }

    private Category category(String name) {

        Category category = new Category();
        category.setName(name);
        return categoryRepository.save(category);
    }

    private Asset asset(
            String assetTag,
            String name,
            String brand,
            String serialNumber,
            Category category,
            AssetStatus status
    ) {

        Asset asset = new Asset();
        asset.setAssetTag(assetTag);
        asset.setName(name);
        asset.setBrand(brand);
        asset.setSerialNumber(serialNumber);
        asset.setCategory(category);
        asset.setStatus(status);
        return assetRepository.save(asset);
    }
}
