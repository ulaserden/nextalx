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

    const [employees, setEmployees] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedEmployee,
        setSelectedEmployee] =
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

    const fetchEmployees =
        async () => {

            try {

                const response =
                    await getEmployees(
                        0,
                        100
                    );

                setEmployees(
                    response.content
                );

            } catch (error) {

                console.error(error);

                showSnackbar(
                    "Employees could not be loaded.",
                    "error"
                );

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchEmployees();

    }, []);

    const handleCreateEmployee =
        async (employeeData) => {

            try {

                await createEmployee(
                    employeeData
                );

                setDialogOpen(
                    false
                );

                await fetchEmployees();

                showSnackbar(
                    "Employee created successfully."
                );

            } catch (error) {

                console.error(error);

                showSnackbar(
                    "Employee could not be created.",
                    "error"
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

                setDialogOpen(
                    false
                );

                setSelectedEmployee(
                    null
                );

                await fetchEmployees();

                showSnackbar(
                    "Employee updated successfully."
                );

            } catch (error) {

                console.error(error);

                showSnackbar(
                    "Employee could not be updated.",
                    "error"
                );
            }
        };

    const handleDeactivateEmployee =
        async (employee) => {

            const confirmed =
                window.confirm(
                    `${employee.firstName} ${employee.lastName} çalışanını pasife almak istiyor musunuz?`
                );

            if (!confirmed) {
                return;
            }

            try {

                await deactivateEmployee(
                    employee.id
                );

                await fetchEmployees();

                showSnackbar(
                    "Employee deactivated successfully."
                );

            } catch (error) {

                console.error(error);

                showSnackbar(
                    "Employee could not be deactivated.",
                    "error"
                );
            }
        };

    const handleActivateEmployee =
        async (employee) => {

            try {

                await activateEmployee(
                    employee.id
                );

                await fetchEmployees();

                showSnackbar(
                    "Employee activated successfully."
                );

            } catch (error) {

                console.error(error);

                showSnackbar(
                    "Employee could not be activated.",
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
                    Employees
                    
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => {

                        setSelectedEmployee(
                            null
                        );

                        setDialogOpen(
                            true
                        );
                    }}
                >
                    Add Employee
                </Button>
            </Box>

            <EmployeesTable
                employees={employees}
                onEdit={(employee) => {

                    setSelectedEmployee(
                        employee
                    );

                    setDialogOpen(
                        true
                    );
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
                employee={
                    selectedEmployee
                }
                onClose={() => {

                    setDialogOpen(
                        false
                    );

                    setSelectedEmployee(
                        null
                    );
                }}
                onSubmit={
                    selectedEmployee
                        ? handleUpdateEmployee
                        : handleCreateEmployee
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

export default EmployeesPage;