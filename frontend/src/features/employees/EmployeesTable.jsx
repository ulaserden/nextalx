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

import BlockIcon
    from "@mui/icons-material/Block";

import CheckCircleIcon
    from "@mui/icons-material/CheckCircle";

function EmployeesTable({
    employees,
    onEdit,
    onActivate,
    onDeactivate
}) {

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 70
        },
        {
            field: "fullName",
            headerName: "Name",
            flex: 1,
            valueGetter: (_, row) =>
                `${row.firstName} ${row.lastName}`
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1.5
        },
        {
            field: "phone",
            headerName: "Phone",
            flex: 1
        },
        {
            field: "jobTitle",
            headerName: "Job Title",
            flex: 1.2
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.8
        },
        {
            field: "departmentName",
            headerName: "Department",
            flex: 1.2
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 140,
            sortable: false,
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
                rows={employees}
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

export default EmployeesTable;