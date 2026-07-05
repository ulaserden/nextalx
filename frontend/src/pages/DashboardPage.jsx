import { useEffect, useState } from "react";

import {
    Box,
    CircularProgress,
    Typography
} from "@mui/material";

import DashboardCards
    from "../features/dashboard/DashboardCards";

import {
    getDashboardStats
} from "../services/dashboardService";

function DashboardPage() {

    const [stats, setStats] =
        useState(null);

    useEffect(() => {

        const fetchData =
            async () => {

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

        fetchData();

    }, []);

    if (!stats) {

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

    return (
        <Box>
            <Typography
                variant="h4"
                sx={{
                    mb: 3,
                    fontWeight: 600
                }}
            >
                Dashboard
            </Typography>

            <DashboardCards
                stats={stats}
            />
        </Box>
    );
}

export default DashboardPage;