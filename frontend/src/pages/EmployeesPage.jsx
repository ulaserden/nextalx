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

                toast.error(
                    error?.userMessage ||
                    "Employees could not be loaded."
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

                setDialogOpen(false);

                await fetchEmployees();

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

                await fetchEmployees();

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

                await fetchEmployees();

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

                await fetchEmployees();

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

            <EmployeesTable
                employees={employees}
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
