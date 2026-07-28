import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
    useMediaQuery,
    useTheme
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import {
    getCategories
} from "../../services/categoryService";

const EMPTY_FORM = {
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
};

function AssetDialog({
    open,
    onClose,
    onSubmit,
    asset
}) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [categories, setCategories] =
        useState([]);

    const [formData, setFormData] =
        useState(EMPTY_FORM);

    const [errors, setErrors] =
        useState({});

    const [submitting, setSubmitting] =
        useState(false);

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

                } catch {
                    // surfaced by the caller's error handling
                }
            };

        if (open) {
            fetchCategories();
        }

    }, [open]);

    useEffect(() => {

        setErrors({});

        if (asset) {

            setFormData({
                assetTag: asset.assetTag || "",
                name: asset.name || "",
                brand: asset.brand || "",
                model: asset.model || "",
                serialNumber: asset.serialNumber || "",
                purchaseDate: asset.purchaseDate || "",
                warrantyEndDate: asset.warrantyEndDate || "",
                purchasePrice:
                    asset.purchasePrice ?? "",
                supplier: asset.supplier || "",
                categoryId: asset.categoryId || ""
            });

        } else {

            setFormData(EMPTY_FORM);
        }

    }, [asset, open]);

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

        if (!formData.assetTag.trim()) {
            next.assetTag = "Asset tag is required.";
        }

        if (!formData.name.trim()) {
            next.name = "Name is required.";
        }

        if (!formData.categoryId) {
            next.categoryId = "Category is required.";
        }

        if (formData.purchasePrice !== "") {

            const price = Number(formData.purchasePrice);

            if (Number.isNaN(price) || price < 0) {
                next.purchasePrice =
                    "Enter a valid non-negative price.";
            }
        }

        if (
            formData.purchaseDate &&
            formData.warrantyEndDate &&
            formData.warrantyEndDate < formData.purchaseDate
        ) {
            next.warrantyEndDate =
                "Warranty end date cannot be before the purchase date.";
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
                    assetTag: formData.assetTag.trim(),
                    name: formData.name.trim(),
                    brand: formData.brand || null,
                    model: formData.model || null,
                    serialNumber: formData.serialNumber || null,
                    purchaseDate: formData.purchaseDate || null,
                    warrantyEndDate:
                        formData.warrantyEndDate || null,
                    purchasePrice:
                        formData.purchasePrice === ""
                            ? null
                            : Number(formData.purchasePrice),
                    supplier: formData.supplier || null,
                    categoryId: Number(formData.categoryId),
                    status: asset ? asset.status : "AVAILABLE"
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
                    error={!!errors.assetTag}
                    helperText={errors.assetTag}
                    required
                    fullWidth
                />

                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
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
                    error={!!errors.warrantyEndDate}
                    helperText={errors.warrantyEndDate}
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
                    type="number"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    error={!!errors.purchasePrice}
                    helperText={errors.purchasePrice}
                    fullWidth
                />

                <TextField
                    label="Supplier"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    fullWidth
                />

                <FormControl
                    fullWidth
                    required
                    error={!!errors.categoryId}
                >

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

                    {
                        errors.categoryId && (
                            <FormHelperText>
                                {errors.categoryId}
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
