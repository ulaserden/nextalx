function getAssignmentStatus(
    returnedDate
) {

    const style = {
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold"
    };

    if (returnedDate === null) {
        return (
            <span
                style={{
                    ...style,
                    backgroundColor: "#fee2e2",
                    color: "#991b1b"
                }}
            >
                Active
            </span>
        );
    }

    return (
        <span
            style={{
                ...style,
                backgroundColor: "#dcfce7",
                color: "#166534"
            }}
        >
            Returned
        </span>
    );
}

function AssignmentsTable({
    assignments
}) {

    return (
        <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "white"
            }}
        >
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Asset</th>
                    <th>Assigned Date</th>
                    <th>Returned Date</th>
                    <th>Status</th>
                    <th>Note</th>
                </tr>
            </thead>

            <tbody>
                {
                    assignments.map(
                        assignment => (
                            <tr
                                key={
                                    assignment.id
                                }
                            >
                                <td>
                                    {assignment.id}
                                </td>

                                <td>
                                    {
                                        assignment.employeeName
                                    }
                                </td>

                                <td>
                                    {
                                        assignment.assetTag
                                    }
                                </td>

                                <td>
                                    {
                                        assignment.assignedDate
                                    }
                                </td>

                                <td>
                                    {
                                        assignment.returnedDate
                                            ?? "-"
                                    }
                                </td>

                                <td>
                                    {
                                        getAssignmentStatus(
                                            assignment.returnedDate
                                        )
                                    }
                                </td>

                                <td>
                                    {
                                        assignment.note
                                    }
                                </td>

                            </tr>
                        )
                    )
                }
            </tbody>
        </table>
    );
}

export default AssignmentsTable;