import {
    Box,
    CircularProgress,
    Grid,
    Typography
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import toast from "react-hot-toast";

import StatCard
    from "../components/dashboard/StatCard";

import {
    getDashboardStats
} from "../services/dashboardService";

function DashboardPage() {

    const [stats, setStats] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const loadDashboard = async () => {

        try {

            const data =
                await getDashboardStats();

            setStats(data);

        } catch (error) {

            toast.error(
                error?.userMessage ||
                "Dashboard could not be loaded."
            );

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        loadDashboard();

    }, []);

    if (loading) {

        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!stats) {

        return (
            <Typography color="text.secondary">
                Dashboard data is unavailable.
            </Typography>
        );
    }

    const cards = [
        {
            title: "Total Assets",
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
            title: "Employees",
            value: stats.totalEmployees
        }
    ];

    return (
        <>
            <Typography
                variant="h4"
                fontWeight={600}
                color="text.primary"
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
                {
                    cards.map((card) => (
                        <Grid
                            key={card.title}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 3
                            }}
                        >
                            <StatCard
                                title={card.title}
                                value={card.value}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}

export default DashboardPage;
