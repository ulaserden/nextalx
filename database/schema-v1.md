# Nextalx Database Schema

**Version:** 1.0
**Status:** Aligned with Flyway migrations V1–V5
**Database:** PostgreSQL 17+
**Author:** Ulaş Erden
**Last Updated:** 2026-07-28

---

# Overview

This document defines the database schema for Nextalx v1.0.

It reflects the actual Flyway migrations under `backend/nextalx-api/src/main/resources/db/migration` (V1–V5), which are the source of truth for the running system. The backend runs with `spring.jpa.hibernate.ddl-auto: validate`, so the JPA entities must match the tables described here exactly.

---

# Entity List

- Department
- Employee
- Category
- Asset
- Assignment

---

# Department

## Description

Represents organizational departments within the company.

| Column | Data Type | Required | Constraint | Description |
|---------|-----------|----------|------------|-------------|
| id | BIGSERIAL | ✅ | PRIMARY KEY | Unique identifier |
| name | VARCHAR(100) | ✅ | UNIQUE | Department name |
| description | VARCHAR(255) | ❌ | - | Department description |
| status | VARCHAR(20) | ✅ | DEFAULT 'ACTIVE' | ACTIVE / INACTIVE |
| created_at | TIMESTAMP | ✅ | NOT NULL | Record creation date |
| updated_at | TIMESTAMP | ✅ | NOT NULL | Last update date |

### Business Rules

- Department names must be unique.
- Departments are deactivated (INACTIVE), not physically deleted.
- Every employee must reference an existing department.

---

# Employee

## Description

Represents employees working within the organization.

| Column | Data Type | Required | Constraint | Description |
|---------|-----------|----------|------------|-------------|
| id | BIGSERIAL | ✅ | PRIMARY KEY | Unique identifier |
| first_name | VARCHAR(100) | ✅ | NOT NULL | First name |
| last_name | VARCHAR(100) | ✅ | NOT NULL | Last name |
| email | VARCHAR(255) | ✅ | UNIQUE | Company email |
| phone | VARCHAR(20) | ❌ | - | Phone number |
| job_title | VARCHAR(100) | ❌ | - | Job title |
| status | VARCHAR(20) | ✅ | CHECK (ACTIVE / INACTIVE) | Employment status |
| department_id | BIGINT | ✅ | FOREIGN KEY | Department reference |
| created_at | TIMESTAMP | ✅ | NOT NULL | Record creation date |
| updated_at | TIMESTAMP | ✅ | NOT NULL | Last update date |

### Business Rules

- Every employee belongs to exactly one department.
- Employee email addresses must be unique.
- Employees are never physically deleted.
- Employees leaving the company become **INACTIVE**.
- The `status` column is protected by a DB CHECK constraint (`ACTIVE`, `INACTIVE`).

---

# Category

## Description

Defines hardware categories.

Examples:

- Laptop
- Monitor
- Mouse
- Keyboard
- Printer
- Phone
- Dock

| Column | Data Type | Required | Constraint | Description |
|---------|-----------|----------|------------|-------------|
| id | BIGSERIAL | ✅ | PRIMARY KEY | Unique identifier |
| name | VARCHAR(100) | ✅ | UNIQUE | Category name |
| description | VARCHAR(255) | ❌ | - | Description |
| status | VARCHAR(20) | ✅ | DEFAULT 'ACTIVE' | ACTIVE / INACTIVE |
| created_at | TIMESTAMP | ✅ | NOT NULL | Record creation date |
| updated_at | TIMESTAMP | ✅ | NOT NULL | Last update date |

> Table name: `categories`.

### Business Rules

- Category names must be unique.
- Every Asset belongs to exactly one category.
- Categories are deactivated (INACTIVE), not physically deleted.

---

# Asset

## Description

Represents physical IT assets.

| Column | Data Type | Required | Constraint | Description |
|---------|-----------|----------|------------|-------------|
| id | BIGSERIAL | ✅ | PRIMARY KEY | Unique identifier |
| asset_tag | VARCHAR(50) | ✅ | UNIQUE | Internal asset number |
| name | VARCHAR(150) | ✅ | NOT NULL | Asset display name |
| brand | VARCHAR(100) | ❌ | - | Brand |
| model | VARCHAR(100) | ❌ | - | Model |
| serial_number | VARCHAR(100) | ❌ | UNIQUE | Manufacturer serial number |
| purchase_date | DATE | ❌ | - | Purchase date |
| warranty_end_date | DATE | ❌ | - | Warranty expiration |
| purchase_price | NUMERIC(12,2) | ❌ | - | Purchase price |
| supplier | VARCHAR(150) | ❌ | - | Supplier / vendor |
| status | VARCHAR(30) | ✅ | DEFAULT 'AVAILABLE' | Asset status (see below) |
| category_id | BIGINT | ✅ | FOREIGN KEY | Category reference |
| created_at | TIMESTAMP | ✅ | NOT NULL | Record creation date |
| updated_at | TIMESTAMP | ✅ | NOT NULL | Last update date |

### Asset Status

Values are enforced at the application level by the `AssetStatus` enum (no DB CHECK constraint in the current migration):

- AVAILABLE
- ASSIGNED
- MAINTENANCE
- RETIRED
- LOST

### Asset Tag Format

```
NXT-000001
NXT-000002
NXT-000003
```

### Business Rules

- Asset Tag must be unique.
- Serial Number, when present, must be unique.
- Assets are never physically deleted.
- Retired assets remain in the system.

---

# Assignment

## Description

Stores asset assignment history.

This table preserves every assignment ever made.

| Column | Data Type | Required | Constraint | Description |
|---------|-----------|----------|------------|-------------|
| id | BIGSERIAL | ✅ | PRIMARY KEY | Unique identifier |
| employee_id | BIGINT | ✅ | FOREIGN KEY | Employee reference |
| asset_id | BIGINT | ✅ | FOREIGN KEY | Asset reference |
| assigned_date | DATE | ✅ | NOT NULL | Assignment date |
| expected_return_date | DATE | ❌ | - | Expected return date |
| returned_date | DATE | ❌ | - | Actual return date |
| notes | VARCHAR(500) | ❌ | - | Additional notes |
| status | VARCHAR(20) | ✅ | DEFAULT 'ACTIVE' | Assignment status (app-enforced by `AssignmentStatus`) |
| created_at | TIMESTAMP | ✅ | NOT NULL | Record creation date |
| updated_at | TIMESTAMP | ✅ | NOT NULL | Last update date |

### Business Rules

- An asset can only have one active assignment.
- Active assignment means:

```
returned_date IS NULL
```

- Assignment history is never deleted.

---

# Relationships

```
Department (1)
        │
        └──────────────< Employee (N)

Employee (1)
        │
        └──────────────< Assignment (N)

Asset (1)
        │
        └──────────────< Assignment (N)

Category (1)
        │
        └──────────────< Asset (N)
```

---

# Constraints

## Unique

- Department.name
- Employee.email
- Category.name
- Asset.asset_tag
- Asset.serial_number

## Foreign Keys

Employee.department_id → Department.id

Asset.category_id → Category.id (table `categories`)

Assignment.employee_id → Employee.id

Assignment.asset_id → Asset.id

---

# Naming Convention

## Database

- snake_case
- plural table names
- singular column names

Examples

```
employees
categories
created_at
department_id
serial_number
```

---

## Java

- camelCase
- Singular class names

Examples

```java
Employee
Department
Category
Assignment

firstName
lastName
departmentId
createdAt
assetTag
serialNumber
```

---

# Design Decisions

- BIGSERIAL is used for all primary keys.
- Soft Delete is not implemented in v1.0; status fields are used instead.
- Employee records are never deleted.
- Asset history is permanently preserved.
- Assignment history is permanently preserved.
- Assets are categorized using the `categories` table.
- One employee can have multiple assets.
- One asset can only have one active assignment.
- Asset and assignment statuses are enforced by application-level enums; employee status additionally has a DB CHECK constraint.
- PostgreSQL is the primary database.
- Spring Boot + JPA manages persistence; schema changes go through Flyway migrations (ddl-auto: validate).

---

# Migration Map

| Migration | Creates / Changes |
|-----------|-------------------|
| V1__initial_schema.sql | `departments`, `employees` |
| V2__add_status_to_departments.sql | adds `status` to `departments` |
| V3__create_categories_table.sql | `categories` |
| V4__create_assets_table.sql | `assets` (FK → `categories`) |
| V5__create_assignments_table.sql | `assignments` (FK → `employees`, `assets`) |

---

# Future Improvements (v2.0)

- Audit Log
- Software License Management
- QR / Barcode Support
- Role-Based Access Control (RBAC)
- Notifications
- Maintenance Records
- Asset Depreciation
- REST API Versioning
- Docker Support
- CI/CD Pipeline
