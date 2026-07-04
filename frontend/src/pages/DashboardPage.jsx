import { useEffect, useState } from "react";

import DashboardCards
    from "../features/dashboard/DashboardCards";

import {
    getDashboardStats
} from "../services/dashboardService";

function DashboardPage() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const data =
                    await getDashboardStats();

                setStats(data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, []);

    if (!stats) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>
                Dashboard
            </h1>

            <DashboardCards
                stats={stats}
            />

        </div>
    );
}

export default DashboardPage;