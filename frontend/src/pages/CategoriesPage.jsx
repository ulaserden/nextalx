import {
    useEffect,
    useState
} from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Snackbar,
    Typography
} from "@mui/material";

import CategoriesTable
    from "../features/categories/CategoriesTable";

import CategoryDialog
    from "../features/categories/CategoryDialog";

import {
    activateCategory,
    createCategory,
    deactivateCategory,
    getCategories,
    updateCategory
} from "../services/categoryService";

function CategoriesPage() {

    const [categories, setCategories] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedCategory,
        setSelectedCategory] =
        useState(null);

    const [snackbar, setSnackbar] =
        useState({
            open: false,
            message: "",
            severity: "success"
        });

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

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchCategories();

    }, []);

    const showSnackbar =
        (
            message,
            severity = "success"
        ) => {

            setSnackbar({
                open: true,
                message,
                severity
            });
        };

    const handleCreateCategory =
        async (categoryData) => {

            try {

                await createCategory(
                    categoryData
                );

                setDialogOpen(false);

                await fetchCategories();

                showSnackbar(
                    "Category created successfully."
                );

            } catch (error) {

                showSnackbar(
                    "Category could not be created.",
                    "error"
                );
            }
        };

    const handleUpdateCategory =
        async (categoryData) => {

            try {

                await updateCategory(
                    selectedCategory.id,
                    categoryData
                );

                setDialogOpen(false);

                setSelectedCategory(
                    null
                );

                await fetchCategories();

                showSnackbar(
                    "Category updated successfully."
                );

            } catch (error) {

                showSnackbar(
                    "Category could not be updated.",
                    "error"
                );
            }
        };

    const handleDeactivateCategory =
        async (category) => {

            try {

                await deactivateCategory(
                    category.id
                );

                await fetchCategories();

                showSnackbar(
                    "Category deactivated successfully."
                );

            } catch (error) {

                showSnackbar(
                    "Category could not be deactivated.",
                    "error"
                );
            }
        };

    const handleActivateCategory =
        async (category) => {

            try {

                await activateCategory(
                    category.id
                );

                await fetchCategories();

                showSnackbar(
                    "Category activated successfully."
                );

            } catch (error) {

                showSnackbar(
                    "Category could not be activated.",
                    "error"
                );
            }
        };

    if (loading) {

        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "center",
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
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    mb: 3
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                    
                    color: "#111"
                }}
                    fontWeight={600}
                >
                    Categories
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => {

                        setSelectedCategory(
                            null
                        );

                        setDialogOpen(true);
                    }}
                >
                    Add Category
                </Button>
            </Box>

            <CategoriesTable
                categories={categories}
                onEdit={(category) => {

                    setSelectedCategory(
                        category
                    );

                    setDialogOpen(true);
                }}
                onActivate={
                    handleActivateCategory
                }
                onDeactivate={
                    handleDeactivateCategory
                }
            />

            <CategoryDialog
                open={dialogOpen}
                category={selectedCategory}
                onClose={() => {

                    setDialogOpen(false);

                    setSelectedCategory(
                        null
                    );
                }}
                onSubmit={
                    selectedCategory
                        ? handleUpdateCategory
                        : handleCreateCategory
                }
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false
                    })
                }
            >
                <Alert
                    severity={
                        snackbar.severity
                    }
                    variant="filled"
                >
                    {
                        snackbar.message
                    }
                </Alert>
            </Snackbar>

        </Box>
    );
}

export default CategoriesPage;