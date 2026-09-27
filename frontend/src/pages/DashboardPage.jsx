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

import {
    useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

import StatCard
    from "../components/dashboard/StatCard";

import ExpiringWarrantiesCard
    from "../components/dashboard/ExpiringWarrantiesCard";

import {
    getDashboardStats,
    getExpiringWarranties
} from "../services/dashboardService";

function DashboardPage() {

    const navigate =
        useNavigate();

    const [stats, setStats] =
        useState(null);

    const [expiringWarranties, setExpiringWarranties] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const loadDashboard = async () => {

        try {

            const [statsData, expiringData] =
                await Promise.all([
                    getDashboardStats(),
                    getExpiringWarranties(5)
                ]);

            setStats(statsData);

            setExpiringWarranties(expiringData);

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

    const showAssetsWithWarranty = (warranty) =>
        navigate(`/assets?warranty=${warranty}`);

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

            <Typography
                variant="h5"
                fontWeight={600}
                color="text.primary"
                sx={{
                    mt: 5,
                    mb: 2
                }}
            >
                Warranty
            </Typography>

            <Grid
                container
                spacing={3}
            >
                <Grid
                    size={{
                        xs: 12,
                        md: 4
                    }}
                >
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 12
                            }}
                        >
                            <StatCard
                                title="Expiring Soon"
                                value={stats.warrantyExpiringAssets}
                                caption={`Within ${stats.warrantyExpiringWithinDays} days`}
                                color={
                                    stats.warrantyExpiringAssets > 0
                                        ? "warning.main"
                                        : undefined
                                }
                                onClick={() =>
                                    showAssetsWithWarranty("EXPIRING")
                                }
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 12
                            }}
                        >
                            <StatCard
                                title="Expired"
                                value={stats.warrantyExpiredAssets}
                                caption="Assets still in service"
                                color={
                                    stats.warrantyExpiredAssets > 0
                                        ? "error.main"
                                        : undefined
                                }
                                onClick={() =>
                                    showAssetsWithWarranty("EXPIRED")
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        md: 8
                    }}
                >
                    <ExpiringWarrantiesCard
                        assets={expiringWarranties}
                        windowDays={stats.warrantyExpiringWithinDays}
                        onViewAll={() =>
                            showAssetsWithWarranty("EXPIRING")
                        }
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default DashboardPage;
