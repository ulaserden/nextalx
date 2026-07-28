-- V6: Foreign-key indexes, status CHECK constraints, and a partial unique
-- index enforcing at most one active (unreturned) assignment per asset.

CREATE INDEX idx_employees_department_id
    ON employees (department_id);

CREATE INDEX idx_assets_category_id
    ON assets (category_id);

CREATE INDEX idx_assignments_employee_id
    ON assignments (employee_id);

CREATE INDEX idx_assignments_asset_id
    ON assignments (asset_id);

CREATE INDEX idx_assignments_returned_date
    ON assignments (returned_date);

-- Enforce "one active assignment per asset" at the database level (guards
-- against the race the application-level check alone cannot fully prevent).
CREATE UNIQUE INDEX uq_active_assignment_per_asset
    ON assignments (asset_id)
    WHERE returned_date IS NULL;

ALTER TABLE assets
    ADD CONSTRAINT chk_asset_status
        CHECK (status IN (
            'AVAILABLE', 'ASSIGNED', 'IN_REPAIR', 'RETIRED', 'LOST', 'BROKEN'
        ));

ALTER TABLE assignments
    ADD CONSTRAINT chk_assignment_status
        CHECK (status IN (
            'ACTIVE', 'RETURNED', 'LOST', 'DAMAGED'
        ));
