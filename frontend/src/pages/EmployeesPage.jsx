import {
    useEffect,
    useState
} from "react";

import {
    Box,
    Button,
    Typography
} from "@mui/material";

import toast from "react-hot-toast";

import ListFilterBar
    from "../components/common/ListFilterBar";

import SelectFilter
    from "../components/common/SelectFilter";

import useDebouncedValue
    from "../hooks/useDebouncedValue";

import useServerList
    from "../hooks/useServerList";

import {
    ACTIVE_STATUS_OPTIONS
} from "../constants/filterOptions";

import {
    getDepartments
} from "../services/departmentService";

import EmployeesTable
    from "../features/employees/EmployeesTable";

import EmployeeDialog
    from "../features/employees/EmployeeDialog";

import {
    createEmployee,
    getEmployees,
    updateEmployee,
    activateEmployee,
    deactivateEmployee
} from "../services/employeeService";

function EmployeesPage() {

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedEmployee,
        setSelectedEmployee] =
        useState(null);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("");

    const [departmentIdFilter, setDepartmentIdFilter] =
        useState("");

    const [departmentOptions, setDepartmentOptions] =
        useState([]);

    const debouncedSearch =
        useDebouncedValue(search);

    const {
        tableProps,
        reload
    } = useServerList(
        getEmployees,
        {
            search: debouncedSearch.trim(),
            status: statusFilter,
            departmentId: departmentIdFilter
        },
        "Employees could not be loaded."
    );

    const hasActiveFilters =
        Boolean(search || statusFilter || departmentIdFilter);

    const clearFilters = () => {

        setSearch("");

        setStatusFilter("");

        setDepartmentIdFilter("");
    };

    // Options for the department filter dropdown.
    useEffect(() => {

        getDepartments({
            size: 100
        })
            .then((data) =>
                setDepartmentOptions(
                    data.content.map((item) => ({
                        value: item.id,
                        label: item.name
                    }))
                )
            )
            .catch(() => {
                // the filter just stays empty; the list itself still loads
            });

    }, []);

    const handleCreateEmployee =
        async (employeeData) => {

            try {

                await createEmployee(
                    employeeData
                );

                setDialogOpen(false);

                reload();

                toast.success(
                    "Employee created successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Employee could not be created."
                );
            }
        };

    const handleUpdateEmployee =
        async (employeeData) => {

            try {

                await updateEmployee(
                    selectedEmployee.id,
                    employeeData
                );

                setDialogOpen(false);

                setSelectedEmployee(null);

                reload();

                toast.success(
                    "Employee updated successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Employee could not be updated."
                );
            }
        };

    const handleDeactivateEmployee =
        async (employee) => {

            const confirmed =
                window.confirm(
                    `Deactivate employee "${employee.firstName} ${employee.lastName}"?`
                );

            if (!confirmed) {
                return;
            }

            try {

                await deactivateEmployee(
                    employee.id
                );

                reload();

                toast.success(
                    "Employee deactivated successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Employee could not be deactivated."
                );
            }
        };

    const handleActivateEmployee =
        async (employee) => {

            try {

                await activateEmployee(
                    employee.id
                );

                reload();

                toast.success(
                    "Employee activated successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Employee could not be activated."
                );
            }
        };

    return (
        <Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 3
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={600}
                    color="text.primary"
                >
                    Employees
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => {

                        setSelectedEmployee(null);

                        setDialogOpen(true);
                    }}
                >
                    Add Employee
                </Button>
            </Box>

            <ListFilterBar
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search by name, email, phone or job title"
                hasActiveFilters={hasActiveFilters}
                onClear={clearFilters}
            >
                <SelectFilter
                    label="Status"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={ACTIVE_STATUS_OPTIONS}
                />

                <SelectFilter
                    label="Department"
                    value={departmentIdFilter}
                    onChange={setDepartmentIdFilter}
                    options={departmentOptions}
                    allLabel="All departments"
                />
            </ListFilterBar>

            <EmployeesTable
                {...tableProps}
                onEdit={(employee) => {

                    setSelectedEmployee(employee);

                    setDialogOpen(true);
                }}
                onDeactivate={
                    handleDeactivateEmployee
                }
                onActivate={
                    handleActivateEmployee
                }
            />

            <EmployeeDialog
                open={dialogOpen}
                employee={selectedEmployee}
                onClose={() => {

                    setDialogOpen(false);

                    setSelectedEmployee(null);
                }}
                onSubmit={
                    selectedEmployee
                        ? handleUpdateEmployee
                        : handleCreateEmployee
                }
            />

        </Box>
    );
}

export default EmployeesPage;
