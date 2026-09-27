import {
    DataGrid
} from "@mui/x-data-grid";

import {
    IconButton,
    Paper,
    Stack
} from "@mui/material";

import EditIcon
    from "@mui/icons-material/Edit";

import BlockIcon
    from "@mui/icons-material/Block";

import CheckCircleIcon
    from "@mui/icons-material/CheckCircle";

function DepartmentsTable({
    rows,
    rowCount,
    loading,
    paginationModel,
    onPaginationModelChange,
    onEdit,
    onActivate,
    onDeactivate
}) {

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 80
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1.5
        },
        {
            field: "description",
            headerName: "Description",
            flex: 2
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            renderCell: (
                params
            ) => (

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

                    {
                        params.row.status ===
                        "ACTIVE" ? (

                            <IconButton
                                color="error"
                                onClick={() =>
                                    onDeactivate(
                                        params.row
                                    )
                                }
                            >
                                <BlockIcon />
                            </IconButton>

                        ) : (

                            <IconButton
                                color="success"
                                onClick={() =>
                                    onActivate(
                                        params.row
                                    )
                                }
                            >
                                <CheckCircleIcon />
                            </IconButton>

                        )
                    }
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

export default DepartmentsTable;