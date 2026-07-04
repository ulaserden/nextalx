function EmployeesTable({
    employees
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Job Title</th>
                    <th>Status</th>
                    <th>Department</th>
                </tr>
            </thead>

            <tbody>
                {
                    employees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>

                            <td>
                                {employee.firstName}
                                {" "}
                                {employee.lastName}
                            </td>

                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.jobTitle}</td>
                            <td>{employee.status}</td>
                            <td>{employee.departmentName}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default EmployeesTable;