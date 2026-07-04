function CategoriesTable({
    categories
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
                    categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default CategoriesTable;