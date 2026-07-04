function DashboardCards({
    stats
}) {

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px"
            }}
        >
            <Card
                title="Departments"
                value={stats.totalDepartments}
            />

            <Card
                title="Employees"
                value={stats.totalEmployees}
            />

            <Card
                title="Assets"
                value={stats.totalAssets}
            />

            <Card
                title="Assigned Assets"
                value={stats.assignedAssets}
            />

            <Card
                title="Available Assets"
                value={stats.availableAssets}
            />

            <Card
                title="Categories"
                value={stats.totalCategories}
            />
        </div>
    );
}

function Card({
    title,
    value
}) {

    return (
        <div
            style={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "12px",
                boxShadow:
                    "0 2px 8px rgba(0,0,0,0.08)"
            }}
        >
            <h3>{title}</h3>

            <h1>
                {value}
            </h1>
        </div>
    );
}

export default DashboardCards;