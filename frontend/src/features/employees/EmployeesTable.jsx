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

import EntityLink
    from "../../components/common/EntityLink";

function EmployeesTable({
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
            width: 70
        },
        {
            field: "fullName",
            headerName: "Name",
            flex: 1,
            valueGetter: (_, row) =>
                `${row.firstName} ${row.lastName}`,
            renderCell: (params) => (
                <EntityLink to={`/employees/${params.row.id}`}>
                    {params.value}
                </EntityLink>
            )
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

export default EmployeesTable;