import {
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

import DepartmentsTable
    from "../features/departments/DepartmentsTable";

import DepartmentDialog
    from "../features/departments/DepartmentDialog";

import {
    activateDepartment,
    createDepartment,
    deactivateDepartment,
    getDepartments,
    updateDepartment
} from "../services/departmentService";

function DepartmentsPage() {

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedDepartment,
        setSelectedDepartment] =
        useState(null);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("");

    const debouncedSearch =
        useDebouncedValue(search);

    const {
        tableProps,
        reload
    } = useServerList(
        getDepartments,
        {
            search: debouncedSearch.trim(),
            status: statusFilter
        },
        "Departments could not be loaded."
    );

    const hasActiveFilters =
        Boolean(search || statusFilter);

    const clearFilters = () => {

        setSearch("");

        setStatusFilter("");
    };

    const handleCreateDepartment =
        async (departmentData) => {

            try {

                await createDepartment(
                    departmentData
                );

                setDialogOpen(false);

                reload();

                toast.success(
                    "Department created successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Department could not be created."
                );
            }
        };

    const handleUpdateDepartment =
        async (departmentData) => {

            try {

                await updateDepartment(
                    selectedDepartment.id,
                    departmentData
                );

                setDialogOpen(false);

                setSelectedDepartment(null);

                reload();

                toast.success(
                    "Department updated successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Department could not be updated."
                );
            }
        };

    const handleDeactivateDepartment =
        async (department) => {

            const confirmed =
                window.confirm(
                    `Deactivate department "${department.name}"?`
                );

            if (!confirmed) {
                return;
            }

            try {

                await deactivateDepartment(
                    department.id
                );

                reload();

                toast.success(
                    "Department deactivated successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Department could not be deactivated."
                );
            }
        };

    const handleActivateDepartment =
        async (department) => {

            try {

                await activateDepartment(
                    department.id
                );

                reload();

                toast.success(
                    "Department activated successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Department could not be activated."
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
                    Departments
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => {

                        setSelectedDepartment(null);

                        setDialogOpen(true);
                    }}
                >
                    Add Department
                </Button>
            </Box>

            <ListFilterBar
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search by name or description"
                hasActiveFilters={hasActiveFilters}
                onClear={clearFilters}
            >
                <SelectFilter
                    label="Status"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={ACTIVE_STATUS_OPTIONS}
                />
            </ListFilterBar>

            <DepartmentsTable
                {...tableProps}
                onEdit={(department) => {

                    setSelectedDepartment(department);

                    setDialogOpen(true);
                }}
                onDeactivate={
                    handleDeactivateDepartment
                }
                onActivate={
                    handleActivateDepartment
                }
            />

            <DepartmentDialog
                open={dialogOpen}
                department={selectedDepartment}
                onClose={() => {

                    setDialogOpen(false);

                    setSelectedDepartment(null);
                }}
                onSubmit={
                    selectedDepartment
                        ? handleUpdateDepartment
                        : handleCreateDepartment
                }
            />

        </Box>
    );
}

export default DepartmentsPage;
