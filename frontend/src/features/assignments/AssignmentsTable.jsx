import { DataGrid } from "@mui/x-data-grid";
import { Paper, Chip } from "@mui/material";

function AssignmentsTable({ assignments }) {

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 80
        },
        {
            field: "employeeName",
            headerName: "Employee",
            width: 220
        },
        {
            field: "assetTag",
            headerName: "Asset Tag",
            width: 160
        },
        {
            field: "assignedDate",
            headerName: "Assigned Date",
            width: 150
        },
        {
            field: "returnedDate",
            headerName: "Returned Date",
            width: 150,
            valueGetter: (_, row) =>
                row.returnedDate || "-"
        },
        {
            field: "status",
            headerName: "Status",
            width: 140,
            renderCell: (params) => {

                const returned =
                    params.row.returnedDate !== null;

                return (
                    <Chip
                        label={
                            returned
                                ? "RETURNED"
                                : "ACTIVE"
                        }
                        color={
                            returned
                                ? "success"
                                : "warning"
                        }
                        size="small"
                    />
                );
            }
        },
        {
            field: "note",
            headerName: "Note",
            flex: 1
        }
    ];

    return (
        <Paper
            elevation={3}
            sx={{
                height: 600,
                width: "100%"
            }}
        >
            <DataGrid
                rows={assignments}
                columns={columns}
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10
                        }
                    }
                }}
                disableRowSelectionOnClick
            />
        </Paper>
    );
}

export default AssignmentsTable;