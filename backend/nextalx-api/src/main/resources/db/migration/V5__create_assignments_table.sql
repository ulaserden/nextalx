CREATE TABLE assignments
(
    id BIGSERIAL PRIMARY KEY,

    employee_id BIGINT NOT NULL,

    asset_id BIGINT NOT NULL,

    assigned_date DATE NOT NULL,

    expected_return_date DATE,

    returned_date DATE,

    notes VARCHAR(500),

    status VARCHAR(20)
                       NOT NULL
        DEFAULT 'ACTIVE',

    created_at TIMESTAMP
                       NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
                       NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_assignment_employee
        FOREIGN KEY (employee_id)
            REFERENCES employees(id),

    CONSTRAINT fk_assignment_asset
        FOREIGN KEY (asset_id)
            REFERENCES assets(id)
);