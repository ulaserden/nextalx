-- V8: Drop the placeholder rows created while smoke-testing the deployment.
--
-- The API exposes no delete endpoint (removal is modelled as deactivation), and
-- the dashboard counts every row regardless of status, so deactivating these
-- would still leave "EXAMPLE" in the department list and an inflated employee
-- total on the public demo.
--
-- Both statements match on the exact placeholder values and are guarded against
-- deleting anything a foreign key still points at, so this is a no-op on a fresh
-- database and cannot cascade into real data.

DELETE
FROM employees
WHERE email = 'example@nextalx.com'
  AND NOT EXISTS (SELECT 1
                  FROM assignments a
                  WHERE a.employee_id = employees.id);

DELETE
FROM departments
WHERE name = 'EXAMPLE'
  AND NOT EXISTS (SELECT 1
                  FROM employees e
                  WHERE e.department_id = departments.id);
