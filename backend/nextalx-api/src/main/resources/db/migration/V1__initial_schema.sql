-- V1: Base organizational tables.
-- Categories, assets and assignments are created in later migrations
-- (V3, V4, V5) and must NOT be created here to avoid duplicate-table conflicts.

CREATE TABLE departments (
                             id BIGSERIAL PRIMARY KEY,
                             name VARCHAR(100) NOT NULL UNIQUE,
                             description VARCHAR(255),

                             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employees (
                           id BIGSERIAL PRIMARY KEY,

                           first_name VARCHAR(100) NOT NULL,
                           last_name VARCHAR(100) NOT NULL,

                           email VARCHAR(255) NOT NULL UNIQUE,
                           phone VARCHAR(20),
                           job_title VARCHAR(100),

                           status VARCHAR(20) NOT NULL,

                           department_id BIGINT NOT NULL,

                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                           CONSTRAINT fk_employee_department
                               FOREIGN KEY (department_id)
                                   REFERENCES departments(id),

                           CONSTRAINT chk_employee_status
                               CHECK (status IN ('ACTIVE', 'INACTIVE'))
);
