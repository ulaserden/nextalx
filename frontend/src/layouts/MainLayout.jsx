import { useState } from "react";

import { Outlet } from "react-router-dom";

import {
    Box
} from "@mui/material";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

const drawerWidth = 240;

function MainLayout() {

    const [
        mobileOpen,
        setMobileOpen
    ] = useState(false);

    const handleDrawerToggle =
        () => setMobileOpen((prev) => !prev);

    const handleDrawerClose =
        () => setMobileOpen(false);

    return (
        <Box
            sx={{
                display: "flex"
            }}
        >
            <Sidebar
                drawerWidth={drawerWidth}
                mobileOpen={mobileOpen}
                onClose={handleDrawerClose}
            />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    width: {
                        md: `calc(100% - ${drawerWidth}px)`
                    },
                    backgroundColor: "background.default"
                }}
            >
                <Topbar
                    onMenuClick={handleDrawerToggle}
                />

                <Box
                    sx={{
                        p: {
                            xs: 2,
                            md: 4
                        }
                    }}
                >
                    <Outlet />
                </Box>

            </Box>

        </Box>
    );
}

export default MainLayout;
