import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";

function AssignmentTable({
    assignments,
    onReturn
}) {

    return (
        <TableContainer
            component={Paper}
        >
            <Table>

                <TableHead>
                    <TableRow>

                        <TableCell>
                            Employee
                        </TableCell>

                        <TableCell>
                            Asset
                        </TableCell>

                        <TableCell>
                            Assigned Date
                        </TableCell>

                        <TableCell>
                            Status
                        </TableCell>

                        <TableCell>
                            Action
                        </TableCell>

                    </TableRow>
                </TableHead>

                <TableBody>

                    {assignments.map(
                        (assignment) => (
                            <TableRow
                                key={
                                    assignment.id
                                }
                            >

                                <TableCell>
                                    {
                                        assignment.employeeName
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        assignment.assetTag
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        assignment.assignedDate
                                    }
                                </TableCell>

                                <TableCell>
                                    {
                                        assignment.status
                                    }
                                </TableCell>

                                <TableCell>

                                    {
                                        assignment.status ===
                                        "ACTIVE" && (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() =>
                                                    onReturn(
                                                        assignment.id
                                                    )
                                                }
                                            >
                                                Return
                                            </Button>
                                        )
                                    }

                                </TableCell>

                            </TableRow>
                        )
                    )}

                </TableBody>

            </Table>
        </TableContainer>
    );
}

export default AssignmentTable;