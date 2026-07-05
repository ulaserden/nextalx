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
    departments,
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
                rows={departments}
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

export default DepartmentsTable;