import {
    useEffect,
    useState
} from "react";

import {
    Box,
    Button,
    CircularProgress,
    Typography
} from "@mui/material";

import toast from "react-hot-toast";

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

                toast.error(
                    error?.userMessage ||
                    "Categories could not be loaded."
                );

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchCategories();

    }, []);

    const handleCreateCategory =
        async (categoryData) => {

            try {

                await createCategory(
                    categoryData
                );

                setDialogOpen(false);

                await fetchCategories();

                toast.success(
                    "Category created successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Category could not be created."
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

                setSelectedCategory(null);

                await fetchCategories();

                toast.success(
                    "Category updated successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Category could not be updated."
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

                toast.success(
                    "Category deactivated successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Category could not be deactivated."
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

                toast.success(
                    "Category activated successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Category could not be activated."
                );
            }
        };

    if (loading) {

        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
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
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: 3
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={600}
                    color="text.primary"
                >
                    Categories
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => {

                        setSelectedCategory(null);

                        setDialogOpen(true);
                    }}
                >
                    Add Category
                </Button>
            </Box>

            <CategoriesTable
                categories={categories}
                onEdit={(category) => {

                    setSelectedCategory(category);

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

                    setSelectedCategory(null);
                }}
                onSubmit={
                    selectedCategory
                        ? handleUpdateCategory
                        : handleCreateCategory
                }
            />

        </Box>
    );
}

export default CategoriesPage;
