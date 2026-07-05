import {
    Card,
    CardContent,
    Grid,
    Typography
} from "@mui/material";

function DashboardCards({ stats }) {

    const cards = [
        {
            title: "Departments",
            value: stats.totalDepartments
        },
        {
            title: "Employees",
            value: stats.totalEmployees
        },
        {
            title: "Assets",
            value: stats.totalAssets
        },
        {
            title: "Assigned Assets",
            value: stats.assignedAssets
        },
        {
            title: "Available Assets",
            value: stats.availableAssets
        },
        {
            title: "Categories",
            value: stats.totalCategories
        }
    ];

    return (
        <Grid
            container
            spacing={3}
        >
            {
                cards.map(card => (
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4
                        }}
                        key={card.title}
                    >
                        <Card
                            elevation={3}
                        >
                            <CardContent>

                                <Typography
                                    variant="h6"
                                    gutterBottom
                                >
                                    {card.title}
                                </Typography>

                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                >
                                    {card.value}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default DashboardCards;