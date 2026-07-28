import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    useMediaQuery,
    useTheme
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

function DepartmentDialog({
    open,
    onClose,
    onSubmit,
    department
}) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [formData, setFormData] =
        useState({
            name: "",
            description: ""
        });

    const [error, setError] =
        useState("");

    const [submitting, setSubmitting] =
        useState(false);

    useEffect(() => {

        setError("");

        if (department) {

            setFormData({
                name: department.name || "",
                description:
                    department.description || ""
            });

        } else {

            setFormData({
                name: "",
                description: ""
            });
        }

    }, [department, open]);

    const handleChange =
        (event) => {

            setFormData({
                ...formData,
                [event.target.name]:
                    event.target.value
            });
        };

    const handleSubmit =
        async () => {

            if (!formData.name.trim()) {
                setError("Name is required.");
                return;
            }

            setSubmitting(true);

            try {

                await onSubmit(formData);

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
                    department
                        ? "Edit Department"
                        : "Create Department"
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
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!error}
                    helperText={error}
                    required
                    fullWidth
                />

                <TextField
                    label="Description"
                    name="description"
                    value={
                        formData.description
                    }
                    onChange={handleChange}
                    fullWidth
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
                    onClick={handleSubmit}
                    disabled={submitting}
                >
                    {
                        department
                            ? "Update"
                            : "Create"
                    }
                </Button>

            </DialogActions>
        </Dialog>
    );
}

export default DepartmentDialog;