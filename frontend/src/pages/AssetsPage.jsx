import {
    useEffect,
    useState
} from "react";

import {
    Box,
    Button,
    Typography
} from "@mui/material";

import {
    useSearchParams
} from "react-router-dom";

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
    ASSET_STATUS_OPTIONS,
    WARRANTY_STATUS_OPTIONS
} from "../constants/filterOptions";

import {
    getCategories
} from "../services/categoryService";

import AssetsTable
    from "../features/assets/AssetsTable";

import AssetDialog
    from "../features/assets/AssetDialog";

import {
    getAssets,
    createAsset,
    updateAsset,
    setAssetRepair,
    setAssetRetired
} from "../services/assetService";

function AssetsPage() {

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedAsset, setSelectedAsset] =
        useState(null);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("");

    const [categoryIdFilter, setCategoryIdFilter] =
        useState("");

    const [categoryOptions, setCategoryOptions] =
        useState([]);

    // The warranty filter lives in the URL (?warranty=EXPIRED) so the
    // dashboard's warranty cards can link straight to a filtered list.
    const [searchParams, setSearchParams] =
        useSearchParams();

    const warrantyParam =
        searchParams.get("warranty");

    const warrantyFilter =
        WARRANTY_STATUS_OPTIONS.some(
            (option) => option.value === warrantyParam
        )
            ? warrantyParam
            : "";

    const setWarrantyFilter = (value) => {

        setSearchParams(
            (params) => {

                if (value) {
                    params.set("warranty", value);
                } else {
                    params.delete("warranty");
                }

                return params;
            },
            {
                replace: true
            }
        );
    };

    const debouncedSearch =
        useDebouncedValue(search);

    const {
        tableProps,
        reload
    } = useServerList(
        getAssets,
        {
            search: debouncedSearch.trim(),
            status: statusFilter,
            categoryId: categoryIdFilter,
            warranty: warrantyFilter
        },
        "Assets could not be loaded."
    );

    const hasActiveFilters =
        Boolean(
            search ||
            statusFilter ||
            categoryIdFilter ||
            warrantyFilter
        );

    const clearFilters = () => {

        setSearch("");

        setStatusFilter("");

        setCategoryIdFilter("");

        setWarrantyFilter("");
    };

    // Options for the category filter dropdown.
    useEffect(() => {

        getCategories({
            size: 100
        })
            .then((data) =>
                setCategoryOptions(
                    data.content.map((item) => ({
                        value: item.id,
                        label: item.name
                    }))
                )
            )
            .catch(() => {
                // the filter just stays empty; the list itself still loads
            });

    }, []);

    const handleSubmit =
        async (data) => {

            try {

                if (selectedAsset) {

                    await updateAsset(
                        selectedAsset.id,
                        data
                    );

                    toast.success(
                        "Asset updated successfully."
                    );

                } else {

                    await createAsset(data);

                    toast.success(
                        "Asset created successfully."
                    );
                }

                setDialogOpen(false);

                setSelectedAsset(null);

                reload();

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Asset could not be saved."
                );
            }
        };

    const handleRepair =
        async (asset) => {

            try {

                await setAssetRepair(asset.id);

                reload();

                toast.success(
                    "Asset marked as in repair."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Asset could not be updated."
                );
            }
        };

    const handleRetire =
        async (asset) => {

            const confirmed =
                window.confirm(
                    `Retire asset "${asset.name}"? This cannot be undone.`
                );

            if (!confirmed) {
                return;
            }

            try {

                await setAssetRetired(asset.id);

                reload();

                toast.success(
                    "Asset retired."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Asset could not be updated."
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
                    Assets
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => {

                        setSelectedAsset(null);

                        setDialogOpen(true);
                    }}
                >
                    Add Asset
                </Button>
            </Box>

            <ListFilterBar
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Search by tag, name, brand, model, serial or supplier"
                hasActiveFilters={hasActiveFilters}
                onClear={clearFilters}
            >
                <SelectFilter
                    label="Status"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={ASSET_STATUS_OPTIONS}
                />

                <SelectFilter
                    label="Category"
                    value={categoryIdFilter}
                    onChange={setCategoryIdFilter}
                    options={categoryOptions}
                    allLabel="All categories"
                />

                <SelectFilter
                    label="Warranty"
                    value={warrantyFilter}
                    onChange={setWarrantyFilter}
                    options={WARRANTY_STATUS_OPTIONS}
                />
            </ListFilterBar>

            <AssetsTable
                {...tableProps}
                onEdit={(asset) => {

                    setSelectedAsset(asset);

                    setDialogOpen(true);
                }}
                onRepair={handleRepair}
                onRetire={handleRetire}
            />

            <AssetDialog
                open={dialogOpen}
                asset={selectedAsset}
                onClose={() => {

                    setDialogOpen(false);

                    setSelectedAsset(null);
                }}
                onSubmit={handleSubmit}
            />

        </Box>
    );
}

export default AssetsPage;
