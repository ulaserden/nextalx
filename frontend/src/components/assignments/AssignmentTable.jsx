import {
    DataGrid
} from "@mui/x-data-grid";

import {
    Button,
    Paper
} from "@mui/material";

import EntityLink
    from "../common/EntityLink";

function AssignmentTable({
    rows,
    rowCount,
    loading,
    paginationModel,
    onPaginationModelChange,
    onReturn,
    // e.g. ["assetTag", "assetName"] on an asset's own history
    hiddenFields = []
}) {

    const allColumns = [
        {
            field: "employeeName",
            headerName: "Employee",
            flex: 1.3,
            renderCell: (params) => (
                <EntityLink to={`/employees/${params.row.employeeId}`}>
                    {params.value}
                </EntityLink>
            )
        },
        {
            field: "assetTag",
            headerName: "Asset",
            flex: 1,
            renderCell: (params) => (
                <EntityLink to={`/assets/${params.row.assetId}`}>
                    {params.value}
                </EntityLink>
            )
        },
        {
            field: "assetName",
            headerName: "Asset Name",
            flex: 1.3
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

    const columns =
        allColumns.filter(
            (column) => !hiddenFields.includes(column.field)
        );

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
