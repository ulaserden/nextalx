import {
    DataGrid
} from "@mui/x-data-grid";

import {
    Button,
    Paper
} from "@mui/material";

function AssignmentTable({
    rows,
    rowCount,
    loading,
    paginationModel,
    onPaginationModelChange,
    onReturn
}) {

    const columns = [
        {
            field: "employeeName",
            headerName: "Employee",
            flex: 1.3
        },
        {
            field: "assetTag",
            headerName: "Asset",
            flex: 1
        },
        {
            field: "assignedDate",
            headerName: "Assigned Date",
            flex: 1
        },
        {
            field: "expectedReturnDate",
            headerName: "Expected Return",
            flex: 1
        },
        {
            field: "returnedDate",
            headerName: "Returned Date",
            flex: 1
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.8
        },
        {
            field: "actions",
            headerName: "Action",
            width: 120,
            renderCell: (params) => (

                params.row.status ===
                "ACTIVE" && (
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                            onReturn(
                                params.row.id
                            )
                        }
                    >
                        Return
                    </Button>
                )
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

export default AssignmentTable;
