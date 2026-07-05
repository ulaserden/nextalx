import {
    DataGrid
} from "@mui/x-data-grid";

import {
    Paper,
    IconButton,
    Stack
} from "@mui/material";

import EditIcon
    from "@mui/icons-material/Edit";

import BuildIcon
    from "@mui/icons-material/Build";

import DeleteForeverIcon
    from "@mui/icons-material/DeleteForever";

function AssetsTable({
    assets,
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
                rows={assets}
                columns={columns}
                autoHeight
                disableRowSelectionOnClick
                pageSizeOptions={[
                    5,
                    10,
                    25
                ]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10
                        }
                    }
                }}
            />
        </Paper>
    );
}

export default AssetsTable;