import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import {
    getDepartments
} from "../../services/departmentService";

function EmployeeDialog({
    open,
    onClose,
    onSubmit,
    employee
}) {

    const [departments, setDepartments] =
        useState([]);

    const [formData, setFormData] =
        useState({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            jobTitle: "",
            departmentId: ""
        });

    useEffect(() => {

        const fetchDepartments =
            async () => {

                const response =
                    await getDepartments(
                        0,
                        100
                    );

                setDepartments(
                    response.content
                );
            };

        if (open) {
            fetchDepartments();
        }

    }, [open]);

    useEffect(() => {

        if (employee) {

            setFormData({
                firstName:
                    employee.firstName || "",
                lastName:
                    employee.lastName || "",
                email:
                    employee.email || "",
                phone:
                    employee.phone || "",
                jobTitle:
                    employee.jobTitle || "",
                departmentId:
                    employee.departmentId || ""
            });

        } else {

            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                jobTitle: "",
                departmentId: ""
            });
        }

    }, [employee]);

    const handleChange =
        (event) => {

            setFormData({
                ...formData,
                [event.target.name]:
                    event.target.value
            });
        };

    const handleSubmit =
        () => {

            onSubmit({
                ...formData,
                status: "ACTIVE",
                departmentId:
                    Number(
                        formData.departmentId
                    )
            });
        };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {
                    employee
                        ? "Edit Employee"
                        : "Create Employee"
                }
            </DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 1
                }}
            >
                <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Job Title"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    fullWidth
                />

                <FormControl fullWidth>
                    <InputLabel>
                        Department
                    </InputLabel>

                    <Select
                        name="departmentId"
                        value={
                            formData.departmentId
                        }
                        label="Department"
                        onChange={handleChange}
                    >
                        {
                            departments.map(
                                department => (
                                    <MenuItem
                                        key={
                                            department.id
                                        }
                                        value={
                                            department.id
                                        }
                                    >
                                        {
                                            department.name
                                        }
                                    </MenuItem>
                                )
                            )
                        }
                    </Select>
                </FormControl>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {
                        employee
                            ? "Update Employee"
                            : "Create Employee"
                    }
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default EmployeeDialog;