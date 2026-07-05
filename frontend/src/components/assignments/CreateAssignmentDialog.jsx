import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Typography,
    Box
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
        assignedDate: new Date()
            .toISOString()
            .split("T")[0],
        expectedReturnDate: "",
        note: ""
    });

    useEffect(() => {

        if (open) {
            loadData();
        }

    }, [open]);

    const loadData = async () => {

        try {

            const employeeResponse =
                await getEmployees(
                    0,
                    100
                );

            const assetResponse =
                await getAssets(
                    0,
                    100
                );

            setEmployees(
                employeeResponse.content
            );

            setAssets(
                assetResponse.content.filter(
                    asset =>
                        asset.status ===
                        "AVAILABLE"
                )
            );

        } catch (error) {

            console.error(
                error
            );
        }
    };

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

    const handleSave =
        () => {

            onSave(
                {
                    employeeId:
                        Number(
                            form.employeeId
                        ),

                    assetId:
                        Number(
                            form.assetId
                        ),

                    assignedDate:
                        form.assignedDate,

                    expectedReturnDate:
                        form.expectedReturnDate ||
                        null,

                    note:
                        form.note
                }
            );
        };

    return (
        <Dialog
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
                    onClick={
                        onClose
                    }
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={
                        handleSave
                    }
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default CreateAssignmentDialog;