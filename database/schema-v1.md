# Nextalx Database Schema

**Version:** 1.0  
**Status:** Draft  
**Database:** PostgreSQL 17+  
**Author:** Ulaş Erden  
**Last Updated:** 2026-07-04

---

# Overview

This document defines the database schema for Nextalx v1.0.

The schema is designed according to the business rules defined in the project documentation and serves as the foundation for the Spring Boot backend.

---

# Entity List

- Department
- Employee
- Asset Category
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
| created_at | TIMESTAMP | ✅ | NOT NULL | Record creation date |
| updated_at | TIMESTAMP | ✅ | NOT NULL | Last update date |

### Business Rules

- Department names must be unique.
- A department cannot be deleted if employees belong to it.

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
| status | ENUM | ✅ | NOT NULL | ACTIVE / INACTIVE |
| department_id | BIGINT | ✅ | FOREIGN KEY | Department reference |
| created_at | TIMESTAMP | ✅ | NOT NULL | Record creation date |
| updated_at | TIMESTAMP | ✅ | NOT NULL | Last update date |

### Business Rules

- Every employee belongs to exactly one department.
- Employee email addresses must be unique.
- Employees are never physically deleted.
- Employees leaving the company become **INACTIVE**.

---

# Asset Category

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
| created_at | TIMESTAMP | ✅ | NOT NULL | Record creation date |
| updated_at | TIMESTAMP | ✅ | NOT NULL | Last update date |

### Business Rules

- Category names must be unique.
- Every Asset belongs to exactly one category.

---

# Asset

## Description

Represents physical IT assets.

| Column | Data Type | Required | Constraint | Description |
|---------|-----------|----------|------------|-------------|
| id | BIGSERIAL | ✅ | PRIMARY KEY | Unique identifier |
| asset_tag | VARCHAR(20) | ✅ | UNIQUE | Internal asset number |
| serial_number | VARCHAR(100) | ✅ | UNIQUE | Manufacturer serial number |
| brand | VARCHAR(100) | ✅ | NOT NULL | Brand |
| model | VARCHAR(100) | ✅ | NOT NULL | Model |
| purchase_date | DATE | ❌ | - | Purchase date |
| warranty_end_date | DATE | ❌ | - | Warranty expiration |
| status | ENUM | ✅ | NOT NULL | Asset status |
| category_id | BIGINT | ✅ | FOREIGN KEY | Category reference |
| created_at | TIMESTAMP | ✅ | NOT NULL | Record creation date |
| updated_at | TIMESTAMP | ✅ | NOT NULL | Last update date |

### Asset Status

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
- Serial Number must be unique.
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
| returned_date | DATE | ❌ | - | Return date |
| notes | TEXT | ❌ | - | Additional notes |
| created_at | TIMESTAMP | ✅ | NOT NULL | Record creation date |

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
        │
        └──────────────< Employee (N)

Employee (1)
        │
        │
        └──────────────< Assignment (N)

Asset (1)
        │
        │
        └──────────────< Assignment (N)

AssetCategory (1)
        │
        │
        └──────────────< Asset (N)
```

---

# Constraints

## Unique

- Department.name
- Employee.email
- AssetCategory.name
- Asset.asset_tag
- Asset.serial_number

## Foreign Keys

Employee.department_id

→ Department.id

Asset.category_id

→ AssetCategory.id

Assignment.employee_id

→ Employee.id

Assignment.asset_id

→ Asset.id

---

# Naming Convention

## Database

- snake_case
- plural table names
- singular column names

Examples

```
employees
asset_categories
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
AssetCategory
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
- Soft Delete is not implemented in v1.0.
- Employee records are never deleted.
- Asset history is permanently preserved.
- Assignment history is permanently preserved.
- Assets are categorized using AssetCategory.
- One employee can have multiple assets.
- One asset can only have one active assignment.
- PostgreSQL is the primary database.
- Spring Boot + JPA will manage persistence.

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