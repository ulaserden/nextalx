# Nextalx Business Rules

**Version:** 1.0
**Status:** Draft
**Scope:** Nextalx v1.0 core modules (Departments, Employees, Categories, Assets, Assignments)

These rules define the domain constraints enforced by the Nextalx backend. They are aligned with the Flyway migrations (`src/main/resources/db/migration`) and the JPA entities, which are the source of truth for the running system.

---

## 1. Departments

- Department `name` must be unique across the system.
- A department may be **ACTIVE** or **INACTIVE** (`status`, default `ACTIVE`).
- A department is never physically deleted; it is deactivated instead.
- Every employee must always point to an existing department, so a department cannot be removed while employees still reference it.

## 2. Employees

- Every employee belongs to **exactly one** department (`department_id` is required).
- Employee `email` must be unique across the system.
- An employee may be **ACTIVE** or **INACTIVE** (`status`).
- Employees are never physically deleted. An employee who leaves the organization is set to **INACTIVE**.
- The assignment history of an employee is preserved even after the employee becomes INACTIVE.

## 3. Categories

- Category `name` must be unique.
- A category may be **ACTIVE** or **INACTIVE** (`status`, default `ACTIVE`).
- Every asset belongs to **exactly one** category (`category_id` is required).
- A category is never physically deleted; it is deactivated instead.

## 4. Assets

- `asset_tag` must be unique (internal inventory number, e.g. `NXT-000001`).
- `serial_number` must be unique (manufacturer serial number).
- Every asset has a lifecycle `status`, restricted to the following values:
  - **AVAILABLE** – in stock, not assigned to anyone.
  - **ASSIGNED** – currently checked out to an employee.
  - **IN_REPAIR** – under repair or servicing.
  - **RETIRED** – decommissioned, kept for historical records.
  - **LOST** – missing / unrecoverable.
  - **BROKEN** – damaged and out of service.
- New assets default to **AVAILABLE**.
- Assets are never physically deleted. A decommissioned asset is set to **RETIRED** and remains in the system.

## 5. Asset Assignment

- An asset can have **only one active assignment at a time**. An assignment is active while `returned_date IS NULL`.
- Assigning an available asset to an employee sets the asset status to **ASSIGNED**.
- Returning an asset records the `returned_date` and sets the asset status back to **AVAILABLE**.
- An asset that is not **AVAILABLE** (e.g. IN_REPAIR, RETIRED, LOST, BROKEN) cannot be assigned.
- An asset with an active assignment cannot have its status changed manually; it must be returned first.
- Assignment history is **never deleted** — every checkout/return is preserved as an audit trail.

## 6. Data Integrity

- All primary keys use `BIGSERIAL` (auto-increment `bigint`).
- Referential integrity is enforced by foreign keys:
  - `employees.department_id → departments.id`
  - `assets.category_id → categories.id`
  - `assignments.employee_id → employees.id`
  - `assignments.asset_id → assets.id`
- Soft delete is **not** implemented in v1.0; deactivation and lifecycle statuses are used instead of row deletion.
- `created_at` / `updated_at` timestamps are maintained on all master records.

## 7. General Rules

- Database naming convention: `snake_case`, plural table names, singular column names.
- Java naming convention: `camelCase` fields, singular `PascalCase` class names.
- History (employees, assets, assignments) is treated as permanent and auditable.
- The database schema is validated at startup (`spring.jpa.hibernate.ddl-auto: validate`); schema changes must go through Flyway migrations, never through Hibernate auto-DDL.
