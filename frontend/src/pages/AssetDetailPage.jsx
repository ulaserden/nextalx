import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";

import {
    useParams
} from "react-router-dom";

import toast from "react-hot-toast";

import AssignmentTable
    from "../components/assignments/AssignmentTable";

import DetailHeader
    from "../components/common/DetailHeader";

import EntityLink
    from "../components/common/EntityLink";

import InfoGrid
    from "../components/common/InfoGrid";

import StatusChip
    from "../components/common/StatusChip";

import WarrantyChip
    from "../components/common/WarrantyChip";

import useRecord
    from "../hooks/useRecord";

import useServerList
    from "../hooks/useServerList";

import {
    getAsset
} from "../services/assetService";

import {
    getAssignments,
    returnAssignment
} from "../services/assignmentService";

import NotFoundPage
    from "./NotFoundPage";

function AssetDetail({
    id
}) {

    const {
        record: asset,
        notFound,
        reload: reloadAsset
    } = useRecord(
        getAsset,
        id,
        "Asset could not be loaded."
    );

    // At most one assignment per asset can be active (enforced in the DB).
    const current =
        useServerList(
            getAssignments,
            {
                assetId: id,
                status: "ACTIVE"
            },
            "Current assignment could not be loaded."
        );

    const history =
        useServerList(
            getAssignments,
            {
                assetId: id
            },
            "Assignment history could not be loaded."
        );

    const handleReturn =
        async (assignmentId) => {

            const confirmed =
                window.confirm(
                    "Mark this assignment as returned?"
                );

            if (!confirmed) {
                return;
            }

            try {

                await returnAssignment(assignmentId);

                reloadAsset();

                current.reload();

                history.reload();

                toast.success(
                    "Asset returned successfully."
                );

            } catch (error) {

                toast.error(
                    error?.userMessage ||
                    "Asset could not be returned."
                );
            }
        };

    if (notFound) {
        return <NotFoundPage />;
    }

    if (!asset) {

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

    const activeAssignment =
        current.tableProps.rows[0];

    return (
        <Box>

            <DetailHeader
                backTo="/assets"
                backLabel="Assets"
                title={`${asset.assetTag} · ${asset.name}`}
                subtitle={asset.categoryName}
                badge={<StatusChip status={asset.status} />}
            />

            <Stack spacing={3}>

                <Card>
                    <CardContent>

                        <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{
                                mb: 1
                            }}
                        >
                            Current holder
                        </Typography>

                        {
                            activeAssignment
                                ? (
                                    <Typography>
                                        <EntityLink to={`/employees/${activeAssignment.employeeId}`}>
                                            {activeAssignment.employeeName}
                                        </EntityLink>
                                        {` since ${activeAssignment.assignedDate}`}
                                        {
                                            activeAssignment.expectedReturnDate &&
                                            ` · expected back ${activeAssignment.expectedReturnDate}`
                                        }
                                    </Typography>
                                )
                                : (
                                    <Typography color="text.secondary">
                                        {
                                            current.tableProps.loading
                                                ? "Loading…"
                                                : "Not assigned to anyone."
                                        }
                                    </Typography>
                                )
                        }

                    </CardContent>
                </Card>

                <Card>
                    <CardContent>

                        <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{
                                mb: 2
                            }}
                        >
                            Details
                        </Typography>

                        <InfoGrid
                            items={[
                                { label: "Brand", value: asset.brand },
                                { label: "Model", value: asset.model },
                                { label: "Serial number", value: asset.serialNumber },
                                { label: "Category", value: asset.categoryName },
                                { label: "Supplier", value: asset.supplier },
                                {
                                    label: "Purchase price",
                                    value: asset.purchasePrice === null
                                        ? null
                                        : Number(asset.purchasePrice).toLocaleString()
                                },
                                { label: "Purchase date", value: asset.purchaseDate },
                                {
                                    label: "Warranty ends",
                                    value: asset.warrantyEndDate && (
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            gap={1}
                                            component="span"
                                        >
                                            {asset.warrantyEndDate}
                                            <WarrantyChip
                                                status={asset.warrantyStatus}
                                                daysRemaining={asset.warrantyDaysRemaining}
                                            />
                                        </Stack>
                                    )
                                }
                            ]}
                        />

                    </CardContent>
                </Card>

                <Box>

                    <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                            mb: 2
                        }}
                    >
                        Assignment history
                    </Typography>

                    <AssignmentTable
                        {...history.tableProps}
                        hiddenFields={["assetTag", "assetName"]}
                        onReturn={handleReturn}
                    />

                </Box>

            </Stack>

        </Box>
    );
}

// Ids are numeric; anything else cannot exist, so skip the requests and
// show the 404 page straight away. Keyed by id so a different record starts
// from a clean state.
function AssetDetailPage() {

    const { id } = useParams();

    if (!/^\d+$/.test(id)) {
        return <NotFoundPage />;
    }

    return (
        <AssetDetail
            key={id}
            id={id}
        />
    );
}

export default AssetDetailPage;
