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

function CategoryDialog({
    open,
    onClose,
    onSubmit,
    category
}) {

    const [formData, setFormData] =
        useState({
            name: "",
            description: ""
        });

    useEffect(() => {

        if (category) {

            setFormData({
                name: category.name,
                description:
                    category.description
            });

        } else {

            setFormData({
                name: "",
                description: ""
            });
        }

    }, [category]);

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

            onSubmit(formData);
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
                    category
                        ? "Edit Category"
                        : "Create Category"
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
                        category
                            ? "Update"
                            : "Create"
                    }
                </Button>

            </DialogActions>
        </Dialog>
    );
}

export default CategoryDialog;