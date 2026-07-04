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

CREATE TABLE asset_categories (
                                  id BIGSERIAL PRIMARY KEY,

                                  name VARCHAR(100) NOT NULL UNIQUE,
                                  description VARCHAR(255),

                                  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE assets (
                        id BIGSERIAL PRIMARY KEY,

                        asset_tag VARCHAR(20) NOT NULL UNIQUE,
                        serial_number VARCHAR(100) NOT NULL UNIQUE,

                        brand VARCHAR(100) NOT NULL,
                        model VARCHAR(100) NOT NULL,

                        purchase_date DATE,
                        warranty_end_date DATE,

                        status VARCHAR(30) NOT NULL,

                        category_id BIGINT NOT NULL,

                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                        CONSTRAINT fk_asset_category
                            FOREIGN KEY (category_id)
                                REFERENCES asset_categories(id),

                        CONSTRAINT chk_asset_status
                            CHECK (
                                status IN (
                                           'AVAILABLE',
                                           'ASSIGNED',
                                           'MAINTENANCE',
                                           'RETIRED',
                                           'LOST'
                                    )
                                )
);

CREATE TABLE assignments (
                             id BIGSERIAL PRIMARY KEY,

                             employee_id BIGINT NOT NULL,
                             asset_id BIGINT NOT NULL,

                             assigned_date DATE NOT NULL,
                             returned_date DATE,

                             notes TEXT,

                             created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                             CONSTRAINT fk_assignment_employee
                                 FOREIGN KEY (employee_id)
                                     REFERENCES employees(id),

                             CONSTRAINT fk_assignment_asset
                                 FOREIGN KEY (asset_id)
                                     REFERENCES assets(id)
);