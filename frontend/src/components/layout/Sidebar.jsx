import {
    Box,
    Drawer,
    Toolbar,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ComputerIcon from "@mui/icons-material/Computer";
import CategoryIcon from "@mui/icons-material/Category";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { Link, useLocation } from "react-router-dom";

const menuItems = [
    {
        text: "Dashboard",
        path: "/",
        icon: <DashboardIcon />
    },
    {
        text: "Employees",
        path: "/employees",
        icon: <PeopleIcon />
    },
    {
        text: "Departments",
        path: "/departments",
        icon: <ApartmentIcon />
    },
    {
        text: "Assets",
        path: "/assets",
        icon: <ComputerIcon />
    },
    {
        text: "Categories",
        path: "/categories",
        icon: <CategoryIcon />
    },
    {
        text: "Assignments",
        path: "/assignments",
        icon: <AssignmentIcon />
    }
];

function Sidebar({
    drawerWidth = 240,
    mobileOpen = false,
    onClose
}) {

    const { pathname } = useLocation();

    const isActive = (path) =>
        path === "/"
            ? pathname === "/"
            : pathname.startsWith(path);

    const drawerContent = (
        <>
            <Toolbar>
                <Typography
                    variant="h5"
                    fontWeight="700"
                    color="primary"
                >
                    NEXTALX
                </Typography>
            </Toolbar>

            <Divider />

            <List>
                {
                    menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            disablePadding
                        >
                            <ListItemButton
                                component={Link}
                                to={item.path}
                                onClick={onClose}
                                selected={isActive(item.path)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.text}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: {
                    md: drawerWidth
                },
                flexShrink: {
                    md: 0
                }
            }}
        >
            {/* Mobile: temporary drawer opened via the Topbar menu button */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: {
                        xs: "block",
                        md: "none"
                    },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box"
                    }
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop: permanent drawer */}
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: {
                        xs: "none",
                        md: "block"
                    },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box"
                    }
                }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}

export default Sidebar;
