import {
    useEffect,
    useState
} from "react";

import {
    Box,
    Button,
    Typography,
    CircularProgress
} from "@mui/material";

import toast from "react-hot-toast";

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

    const [assets, setAssets] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [selectedAsset, setSelectedAsset] =
        useState(null);

    const fetchAssets =
        async () => {

            try {

                const response =
                    await getAssets(
                        0,
                        100
                    );

                setAssets(
                    response.content
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Assets could not be loaded."
                );

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchAssets();

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

                await fetchAssets();

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

                await fetchAssets();

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

                await fetchAssets();

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

            <AssetsTable
                assets={assets}
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
