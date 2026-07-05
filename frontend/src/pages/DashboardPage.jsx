import {
    Grid,
    Typography
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import StatCard
    from "../components/dashboard/StatCard";

import {
    getDashboardStats
} from "../services/dashboardService";

function DashboardPage() {

    const [
        stats,
        setStats
    ] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data =
                await getDashboardStats();

            setStats(
                data
            );

        } catch (error) {

            console.error(
                error
            );
        }
    };

    if (!stats) {

        return (
            <Typography>
                Loading...
            </Typography>
        );
    }

    return (
        <>
            <Typography
                variant="h4"
                sx={{
                    mb: 4
                }}
            >
                Dashboard
            </Typography>

            <Grid
                container
                spacing={3}
            >

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <StatCard
                        title="Total Assets"
                        value={
                            stats.totalAssets
                        }
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <StatCard
                        title="Assigned Assets"
                        value={
                            stats.assignedAssets
                        }
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <StatCard
                        title="Available Assets"
                        value={
                            stats.availableAssets
                        }
                    />
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >
                    <StatCard
                        title="Employees"
                        value={
                            stats.totalEmployees
                        }
                    />
                </Grid>

            </Grid>
        </>
    );
}

export default DashboardPage;