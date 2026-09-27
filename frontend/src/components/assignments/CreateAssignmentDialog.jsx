import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Typography,
    Box,
    useMediaQuery,
    useTheme
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import {
    getEmployees
} from "../../services/employeeService";

import {
    getAssets
} from "../../services/assetService";

function CreateAssignmentDialog({
    open,
    onClose,
    onSave
}) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [
        employees,
        setEmployees
    ] = useState([]);

    const [
        assets,
        setAssets
    ] = useState([]);

    const [
        form,
        setForm
    ] = useState({
        employeeId: "",
        assetId: "",
        assignedDate: "",
        expectedReturnDate: "",
        note: ""
    });

    const [errors, setErrors] =
        useState({});

    const [submitting, setSubmitting] =
        useState(false);

    const loadData = async () => {

        try {

            // Only active employees and available assets can take part in
            // a new assignment, so let the API filter them.
            const employeeResponse =
                await getEmployees({
                    size: 100,
                    status: "ACTIVE"
                });

            const assetResponse =
                await getAssets({
                    size: 100,
                    status: "AVAILABLE"
                });

            setEmployees(
                employeeResponse.content
            );

            setAssets(
                assetResponse.content
            );

        } catch (error) {

            console.error(
                error
            );
        }
    };

    useEffect(() => {

        if (open) {

            setErrors({});

            setForm({
                employeeId: "",
                assetId: "",
                assignedDate: new Date()
                    .toISOString()
                    .split("T")[0],
                expectedReturnDate: "",
                note: ""
            });

            loadData();
        }

    }, [open]);

    const handleChange = (
        event
    ) => {

        setForm({
            ...form,
            [
                event.target.name
            ]: event.target.value
        });
    };

    const validate = () => {

        const next = {};

        if (!form.employeeId) {
            next.employeeId = "Employee is required.";
        }

        if (!form.assetId) {
            next.assetId = "Asset is required.";
        }

        if (!form.assignedDate) {
            next.assignedDate = "Assigned date is required.";
        }

        if (
            form.assignedDate &&
            form.expectedReturnDate &&
            form.expectedReturnDate < form.assignedDate
        ) {
            next.expectedReturnDate =
                "Expected return date cannot be before the assigned date.";
        }

        setErrors(next);

        return Object.keys(next).length === 0;
    };

    const handleSave =
        async () => {

            if (!validate()) {
                return;
            }

            setSubmitting(true);

            try {

                await onSave({
                    employeeId: Number(form.employeeId),
                    assetId: Number(form.assetId),
                    assignedDate: form.assignedDate,
                    expectedReturnDate:
                        form.expectedReturnDate || null,
                    note: form.note
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
                Assign Asset
            </DialogTitle>

            <DialogContent>

                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Employee"
                    name="employeeId"
                    required
                    error={!!errors.employeeId}
                    helperText={errors.employeeId}
                    value={
                        form.employeeId
                    }
                    onChange={
                        handleChange
                    }
                >
                    {
                        employees.map(
                            employee => (
                                <MenuItem
                                    key={
                                        employee.id
                                    }
                                    value={
                                        employee.id
                                    }
                                >
                                    {
                                        employee.firstName
                                    } {
                                        employee.lastName
                                    }
                                </MenuItem>
                            )
                        )
                    }
                </TextField>

                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Asset"
                    name="assetId"
                    required
                    error={!!errors.assetId}
                    helperText={errors.assetId}
                    value={
                        form.assetId
                    }
                    onChange={
                        handleChange
                    }
                >
                    {
                        assets.map(
                            asset => (
                                <MenuItem
                                    key={
                                        asset.id
                                    }
                                    value={
                                        asset.id
                                    }
                                >
                                    {
                                        asset.assetTag
                                    } - {
                                        asset.name
                                    }
                                </MenuItem>
                            )
                        )
                    }
                </TextField>

                <Box
                    sx={{
                        mt: 2
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 1
                        }}
                    >
                        Assigned Date
                    </Typography>

                    <TextField
                        fullWidth
                        type="date"
                        name="assignedDate"
                        value={
                            form.assignedDate
                        }
                        onChange={
                            handleChange
                        }
                    />
                </Box>

                <Box
                    sx={{
                        mt: 2
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 1
                        }}
                    >
                        Expected Return Date
                    </Typography>

                    <TextField
                        fullWidth
                        type="date"
                        name="expectedReturnDate"
                        error={!!errors.expectedReturnDate}
                        helperText={errors.expectedReturnDate}
                        value={
                            form.expectedReturnDate
                        }
                        onChange={
                            handleChange
                        }
                    />
                </Box>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Note"
                    name="note"
                    value={
                        form.note
                    }
                    onChange={
                        handleChange
                    }
                    multiline
                    rows={3}
                />

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
                    onClick={handleSave}
                    disabled={submitting}
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default CreateAssignmentDialog;