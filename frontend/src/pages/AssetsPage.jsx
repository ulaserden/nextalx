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

    const [assets,
        setAssets] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    const [dialogOpen,
        setDialogOpen] =
        useState(false);

    const [selectedAsset,
        setSelectedAsset] =
        useState(null);

    const fetchAssets =
        async () => {

            const response =
                await getAssets(
                    0,
                    100
                );

            setAssets(
                response.content
            );

            setLoading(
                false
            );
        };

    useEffect(() => {

        fetchAssets();

    }, []);

    const handleSubmit =
        async (data) => {

            if (selectedAsset) {

                await updateAsset(
                    selectedAsset.id,
                    data
                );

            } else {

                await createAsset(
                    data
                );
            }

            setDialogOpen(
                false
            );

            setSelectedAsset(
                null
            );

            await fetchAssets();
        };

    if (loading) {

        return (
            <CircularProgress />
        );
    }

    return (
        <Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    mb: 3
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                    
                    color: "#111"
                }}
                >
                    Assets
                </Typography>

                <Button
                    variant="contained"
                    onClick={() =>
                        setDialogOpen(
                            true
                        )
                    }
                >
                    Add Asset
                </Button>
            </Box>

            <AssetsTable
                assets={assets}
                onEdit={(asset) => {

                    setSelectedAsset(
                        asset
                    );

                    setDialogOpen(
                        true
                    );
                }}
                onRepair={
                    async asset => {

                        await setAssetRepair(
                            asset.id
                        );

                        fetchAssets();
                    }
                }
                onRetire={
                    async asset => {

                        await setAssetRetired(
                            asset.id
                        );

                        fetchAssets();
                    }
                }
            />

            <AssetDialog
                open={
                    dialogOpen
                }
                asset={
                    selectedAsset
                }
                onClose={() => {

                    setDialogOpen(
                        false
                    );

                    setSelectedAsset(
                        null
                    );
                }}
                onSubmit={
                    handleSubmit
                }
            />

        </Box>
    );
}

export default AssetsPage;