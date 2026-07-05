import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import {
    getCategories
} from "../../services/categoryService";

function AssetDialog({
    open,
    onClose,
    onSubmit,
    asset
}) {

    const [categories, setCategories] =
        useState([]);

    const [formData, setFormData] =
        useState({
            assetTag: "",
            name: "",
            brand: "",
            model: "",
            serialNumber: "",
            purchaseDate: "",
            warrantyEndDate: "",
            purchasePrice: "",
            supplier: "",
            categoryId: ""
        });

    useEffect(() => {

        const fetchCategories =
            async () => {

                try {

                    const response =
                        await getCategories(
                            0,
                            100
                        );

                    setCategories(
                        response.content
                    );

                } catch (error) {

                    console.error(error);
                }
            };

        if (open) {
            fetchCategories();
        }

    }, [open]);

    useEffect(() => {

        if (asset) {

            setFormData({
                assetTag:
                    asset.assetTag || "",

                name:
                    asset.name || "",

                brand:
                    asset.brand || "",

                model:
                    asset.model || "",

                serialNumber:
                    asset.serialNumber || "",

                purchaseDate:
                    asset.purchaseDate || "",

                warrantyEndDate:
                    asset.warrantyEndDate || "",

                purchasePrice:
                    asset.purchasePrice || "",

                supplier:
                    asset.supplier || "",

                categoryId:
                    asset.categoryId || ""
            });

        } else {

            setFormData({
                assetTag: "",
                name: "",
                brand: "",
                model: "",
                serialNumber: "",
                purchaseDate: "",
                warrantyEndDate: "",
                purchasePrice: "",
                supplier: "",
                categoryId: ""
            });
        }

    }, [asset]);

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
                categoryId:
                    Number(
                        formData.categoryId
                    ),
                status:
                    "AVAILABLE"
            });
        };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>
                {
                    asset
                        ? "Edit Asset"
                        : "Create Asset"
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
                    label="Asset Tag"
                    name="assetTag"
                    value={formData.assetTag}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Serial Number"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    type="date"
                    label="Purchase Date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />

                <TextField
                    type="date"
                    label="Warranty End Date"
                    name="warrantyEndDate"
                    value={formData.warrantyEndDate}
                    onChange={handleChange}
                    fullWidth
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        }
                    }}
                />

                <TextField
                    label="Purchase Price"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    label="Supplier"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    fullWidth
                />

                <FormControl fullWidth>

                    <InputLabel>
                        Category
                    </InputLabel>

                    <Select
                        name="categoryId"
                        value={formData.categoryId}
                        label="Category"
                        onChange={handleChange}
                    >
                        {
                            categories.map(
                                (category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </MenuItem>
                                )
                            )
                        }
                    </Select>

                </FormControl>

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
                        asset
                            ? "Update Asset"
                            : "Create Asset"
                    }
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default AssetDialog;