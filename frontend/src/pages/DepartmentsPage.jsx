import {
    useEffect,
    useState
} from "react";

import {
    Box,
    Button,
    CircularProgress,
    Typography
} from "@mui/material";

import toast from "react-hot-toast";

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

    const [departments, setDepartments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedDepartment,
        setSelectedDepartment] =
        useState(null);

    const fetchDepartments =
        async () => {

            try {

                const response =
                    await getDepartments(
                        0,
                        100
                    );

                setDepartments(
                    response.content
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Departments could not be loaded."
                );

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchDepartments();

    }, []);

    const handleCreateDepartment =
        async (departmentData) => {

            try {

                await createDepartment(
                    departmentData
                );

                setDialogOpen(false);

                await fetchDepartments();

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

                await fetchDepartments();

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

                await fetchDepartments();

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

                await fetchDepartments();

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

    if (loading) {

        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

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

            <DepartmentsTable
                departments={departments}
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
