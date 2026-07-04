function getStatusBadge(status) {

    const style = {
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold"
    };

    if (status === "AVAILABLE") {
        return (
            <span
                style={{
                    ...style,
                    backgroundColor: "#dcfce7",
                    color: "#166534"
                }}
            >
                Available
            </span>
        );
    }

    return (
        <span
            style={{
                ...style,
                backgroundColor: "#fee2e2",
                color: "#991b1b"
            }}
        >
            Assigned
        </span>
    );
}

function AssetsTable({
    assets
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
                    <th>Asset Tag</th>
                    <th>Brand</th>
                    <th>Model</th>
                    <th>Status</th>
                    <th>Category</th>
                </tr>
            </thead>

            <tbody>
                {
                    assets.map(asset => (
                        <tr key={asset.id}>
                            <td>{asset.id}</td>
                            <td>{asset.assetTag}</td>
                            <td>{asset.brand}</td>
                            <td>{asset.model}</td>

                            <td>
                                {
                                    getStatusBadge(
                                        asset.status
                                    )
                                }
                            </td>

                            <td>
                                {asset.categoryName}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

export default AssetsTable;