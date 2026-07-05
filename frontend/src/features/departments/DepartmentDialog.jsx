import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
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

    const [formData, setFormData] =
        useState({
            name: "",
            description: ""
        });

    useEffect(() => {

        if (department) {

            setFormData({
                name:
                    department.name,
                description:
                    department.description
            });

        } else {

            setFormData({
                name: "",
                description: ""
            });
        }

    }, [department]);

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

            onSubmit(
                formData
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
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
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