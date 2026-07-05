import { Outlet } from "react-router-dom";

import {
    Box
} from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function MainLayout() {

    return (
        <Box
            sx={{
                display: "flex"
            }}
        >
            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    backgroundColor: "#f5f7fa"
                }}
            >
                <Topbar />

                <Box
                    sx={{
                        p: 4
                    }}
                >
                    <Outlet />
                </Box>

            </Box>

        </Box>
    );
}

export default MainLayout;