import {
    useState
} from "react";

import {
    Box,
    Button,
    Typography
} from "@mui/material";

import toast from "react-hot-toast";

import ListFilterBar
    from "../components/common/ListFilterBar";

import SelectFilter
    from "../components/common/SelectFilter";

import useDebouncedValue
    from "../hooks/useDebouncedValue";

import useServerList
    from "../hooks/useServerList";

import {
    ACTIVE_STATUS_OPTIONS
} from "../constants/filterOptions";

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

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedCategory,
        setSelectedCategory] =
        useState(null);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("");

    const debouncedSearch =
        useDebouncedValue(search);

    const {
        tableProps,
        reload
    } = useServerList(
        getCategories,
        {
            search: debouncedSearch.trim(),
            status: statusFilter
        },
        "Categories could not be loaded."
    );

    const hasActiveFilters =
        Boolean(search || statusFilter);

    const clearFilters = () => {

        setSearch("");

        setStatusFilter("");
    };

    const handleCreateCategory =
        async (categoryData) => {

            try {

                await createCategory(
                    categoryData
                );

                setDialogOpen(false);

                reload();

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

                reload();

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

                reload();

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

                reload();

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

            <ListFilterBar
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search by name or description"
                hasActiveFilters={hasActiveFilters}
                onClear={clearFilters}
            >
                <SelectFilter
                    label="Status"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={ACTIVE_STATUS_OPTIONS}
                />
            </ListFilterBar>

            <CategoriesTable
                {...tableProps}
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
