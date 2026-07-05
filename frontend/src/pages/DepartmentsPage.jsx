import {
    useEffect,
    useState
} from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Snackbar,
    Typography
} from "@mui/material";

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

    const [snackbar, setSnackbar] =
        useState({
            open: false,
            message: "",
            severity: "success"
        });

    const showSnackbar = (
        message,
        severity = "success"
    ) => {

        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    const handleCloseSnackbar =
        () => {

            setSnackbar(
                previous => ({
                    ...previous,
                    open: false
                })
            );
        };

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

                console.error(error);

                showSnackbar(
                    "Departments could not be loaded.",
                    "error"
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

                setDialogOpen(
                    false
                );

                await fetchDepartments();

                showSnackbar(
                    "Department created successfully."
                );

            } catch (error) {

                console.error(error);

                showSnackbar(
                    "Department could not be created.",
                    "error"
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

                setDialogOpen(
                    false
                );

                setSelectedDepartment(
                    null
                );

                await fetchDepartments();

                showSnackbar(
                    "Department updated successfully."
                );

            } catch (error) {

                console.error(error);

                showSnackbar(
                    "Department could not be updated.",
                    "error"
                );
            }
        };

    const handleDeactivateDepartment =
        async (department) => {

            const confirmed =
                window.confirm(
                    `${department.name} departmanını pasife almak istiyor musunuz?`
                );

            if (!confirmed) {
                return;
            }

            try {

                await deactivateDepartment(
                    department.id
                );

                await fetchDepartments();

                showSnackbar(
                    "Department deactivated successfully."
                );

            } catch (error) {

                console.error(error);

                showSnackbar(
                    "Department could not be deactivated.",
                    "error"
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

                showSnackbar(
                    "Department activated successfully."
                );

            } catch (error) {

                console.error(error);

                showSnackbar(
                    "Department could not be activated.",
                    "error"
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
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                    
                    color: "#111"
                }}
                    fontWeight={600}
                >
                    Departments
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => {

                        setSelectedDepartment(
                            null
                        );

                        setDialogOpen(
                            true
                        );
                    }}
                >
                    Add Department
                </Button>
            </Box>

            <DepartmentsTable
                departments={departments}
                onEdit={(department) => {

                    setSelectedDepartment(
                        department
                    );

                    setDialogOpen(
                        true
                    );
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
                department={
                    selectedDepartment
                }
                onClose={() => {

                    setDialogOpen(
                        false
                    );

                    setSelectedDepartment(
                        null
                    );
                }}
                onSubmit={
                    selectedDepartment
                        ? handleUpdateDepartment
                        : handleCreateDepartment
                }
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
            >
                <Alert
                    severity={
                        snackbar.severity
                    }
                    onClose={
                        handleCloseSnackbar
                    }
                    variant="filled"
                    sx={{
                        width: "100%"
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Box>
    );
}

export default DepartmentsPage;