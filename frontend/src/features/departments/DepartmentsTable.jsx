function DepartmentsTable({
    departments
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
                    <th>Description</th>
                </tr>
            </thead>

            <tbody>
                {
                    departments.map(department => (
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.name}</td>
                            <td>{department.description}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default DepartmentsTable;