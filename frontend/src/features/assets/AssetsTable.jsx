import {
    DataGrid
} from "@mui/x-data-grid";

import {
    Paper,
    IconButton,
    Stack,
    Tooltip
} from "@mui/material";

import WarrantyChip
    from "../../components/common/WarrantyChip";

import EditIcon
    from "@mui/icons-material/Edit";

import BuildIcon
    from "@mui/icons-material/Build";

import DeleteForeverIcon
    from "@mui/icons-material/DeleteForever";

function AssetsTable({
    rows,
    rowCount,
    loading,
    paginationModel,
    onPaginationModelChange,
    onEdit,
    onRepair,
    onRetire
}) {

    const columns = [

        {
            field: "assetTag",
            headerName: "Asset Tag",
            width: 120
        },

        {
            field: "name",
            headerName: "Name",
            flex: 1.3
        },

        {
            field: "brand",
            headerName: "Brand",
            flex: 1
        },

        {
            field: "model",
            headerName: "Model",
            flex: 1
        },

        {
            field: "serialNumber",
            headerName: "Serial Number",
            flex: 1.2
        },

        {
            field: "categoryName",
            headerName: "Category",
            flex: 1
        },

        {
            field: "supplier",
            headerName: "Supplier",
            flex: 1
        },

        {
            field: "purchasePrice",
            headerName: "Price",
            flex: 0.8
        },

        {
            field: "status",
            headerName: "Status",
            flex: 1
        },

        {
            field: "warrantyEndDate",
            headerName: "Warranty",
            flex: 1.3,
            minWidth: 190,

            // Expired / expiring warranties get a coloured badge (end date in
            // the tooltip); everything else just shows the end date.
            renderCell: (params) => {

                const {
                    warrantyEndDate,
                    warrantyStatus,
                    warrantyDaysRemaining
                } = params.row;

                if (
                    warrantyStatus === "EXPIRED" ||
                    warrantyStatus === "EXPIRING"
                ) {

                    return (
                        <Tooltip title={`Warranty ends ${warrantyEndDate}`}>
                            <span>
                                <WarrantyChip
                                    status={warrantyStatus}
                                    daysRemaining={warrantyDaysRemaining}
                                />
                            </span>
                        </Tooltip>
                    );
                }

                return warrantyEndDate || "—";
            }
        },

        {
            field: "actions",
            headerName: "Actions",
            width: 170,

            renderCell: (params) => (

                <Stack
                    direction="row"
                    spacing={1}
                >

                    <IconButton
                        onClick={() =>
                            onEdit(
                                params.row
                            )
                        }
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        onClick={() =>
                            onRepair(
                                params.row
                            )
                        }
                    >
                        <BuildIcon />
                    </IconButton>

                    <IconButton
                        onClick={() =>
                            onRetire(
                                params.row
                            )
                        }
                    >
                        <DeleteForeverIcon />
                    </IconButton>

                </Stack>
            )
        }
    ];

    return (
        <Paper
            elevation={3}
            sx={{
                width: "100%"
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                autoHeight
                disableRowSelectionOnClick
                paginationMode="server"
                rowCount={rowCount}
                loading={loading}
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}
                pageSizeOptions={[
                    5,
                    10,
                    25
                ]}
                // Rows are one server page: sorting / filtering them in the
                // grid would only reorder that page, so it is done via the
                // filter bar instead.
                disableColumnSorting
                disableColumnFilter
            />
        </Paper>
    );
}

export default AssetsTable;