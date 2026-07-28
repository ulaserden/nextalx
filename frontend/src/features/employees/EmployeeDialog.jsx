import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useMediaQuery,
    useTheme
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import {
    getDepartments
} from "../../services/departmentService";

const EMPTY_FORM = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    jobTitle: "",
    departmentId: ""
};

function EmployeeDialog({
    open,
    onClose,
    onSubmit,
    employee
}) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [departments, setDepartments] =
        useState([]);

    const [formData, setFormData] =
        useState(EMPTY_FORM);

    const [errors, setErrors] =
        useState({});

    const [submitting, setSubmitting] =
        useState(false);

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

        setErrors({});

        if (employee) {

            setFormData({
                firstName: employee.firstName || "",
                lastName: employee.lastName || "",
                email: employee.email || "",
                phone: employee.phone || "",
                jobTitle: employee.jobTitle || "",
                departmentId: employee.departmentId || ""
            });

        } else {

            setFormData(EMPTY_FORM);
        }

    }, [employee, open]);

    const handleChange =
        (event) => {

            setFormData({
                ...formData,
                [event.target.name]:
                    event.target.value
            });
        };

    const validate = () => {

        const next = {};

        if (!formData.firstName.trim()) {
            next.firstName = "First name is required.";
        }

        if (!formData.lastName.trim()) {
            next.lastName = "Last name is required.";
        }

        if (!formData.email.trim()) {
            next.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email
            )
        ) {
            next.email = "Enter a valid email address.";
        }

        if (!formData.departmentId) {
            next.departmentId = "Department is required.";
        }

        setErrors(next);

        return Object.keys(next).length === 0;
    };

    const handleSubmit =
        async () => {

            if (!validate()) {
                return;
            }

            setSubmitting(true);

            try {

                await onSubmit({
                    ...formData,
                    status: employee?.status || "ACTIVE",
                    departmentId: Number(
                        formData.departmentId
                    )
                });

            } finally {

                setSubmitting(false);
            }
        };

    return (
        <Dialog
            fullScreen={fullScreen}
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
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    required
                    fullWidth
                />

                <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    required
                    fullWidth
                />

                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
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

                <FormControl
                    fullWidth
                    required
                    error={!!errors.departmentId}
                >
                    <InputLabel>
                        Department
                    </InputLabel>

                    <Select
                        name="departmentId"
                        value={formData.departmentId}
                        label="Department"
                        onChange={handleChange}
                    >
                        {
                            departments.map(
                                (department) => (
                                    <MenuItem
                                        key={department.id}
                                        value={department.id}
                                    >
                                        {department.name}
                                    </MenuItem>
                                )
                            )
                        }
                    </Select>

                    {
                        errors.departmentId && (
                            <FormHelperText>
                                {errors.departmentId}
                            </FormHelperText>
                        )
                    }
                </FormControl>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                    disabled={submitting}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={submitting}
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
